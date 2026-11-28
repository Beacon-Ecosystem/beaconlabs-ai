-- Beacon CRM migration 0006: Beacon Labs free Signal Check requests + Labs purchase tagging (Nov 27 2026).
-- Mirrors the GoHighLevel model Bob used: ONE contact per email (dedupe inside capture_form), a TAG per action,
-- and an event-history row for every action (crm.form_submissions + crm.audit_events + crm.payment_events).
-- Same restricted pattern as 0005: each role can only EXECUTE its own function(s); no table rights. Never sends email.
--   crm_labs      -> crm.signal_check_request(), crm.signal_check_event()   (beaconlabs.ai Signal Check endpoint)
--   crm_purchases -> crm.record_labs_purchase()                              (Stripe payment_intent.succeeded path only)
-- Consent note: a Signal Check request consents to contact about THAT request only. It never sets the contact's
-- marketing email_consent (that stays 'unknown' until they join the Keeper's Log).
BEGIN;
SET search_path = crm;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'crm_labs') THEN
    CREATE ROLE crm_labs LOGIN CONNECTION LIMIT 5;        -- password set outside the migration, never printed
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'crm_purchases') THEN
    CREATE ROLE crm_purchases LOGIN CONNECTION LIMIT 5;   -- password set outside the migration, never printed
  END IF;
END $$;
DO $$ BEGIN
  EXECUTE format('GRANT CONNECT ON DATABASE %I TO crm_labs, crm_purchases', current_database());
END $$;
ALTER ROLE crm_labs SET search_path = crm;
ALTER ROLE crm_purchases SET search_path = crm;
GRANT USAGE ON SCHEMA crm TO crm_labs, crm_purchases;

-- 1. A free Signal Check request: contact + tags (signal-check-request, site:<host>, business:<slug>) + submission row.
CREATE OR REPLACE FUNCTION crm.signal_check_request(
  p_email text, p_first_name text, p_last_name text, p_business text, p_site text, p_industry text,
  p_description text, p_request_consent boolean, p_consent_text text, p_ip_hash text, p_user_agent text,
  p_source text, p_is_test boolean DEFAULT false)
RETURNS TABLE (contact_id uuid, submission_id uuid, contact_created boolean, is_test boolean)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = crm, pg_temp AS $fn$
#variable_conflict use_column
DECLARE r record; v_host text; v_biz text;
BEGIN
  IF p_request_consent IS NOT TRUE THEN RAISE EXCEPTION 'consent required' USING ERRCODE = '22023'; END IF;
  -- site host, lower-case, no scheme / www / path
  v_host := lower(btrim(coalesce(p_site, '')));
  v_host := regexp_replace(v_host, '^[a-z][a-z0-9+.-]*://', '');
  v_host := regexp_replace(v_host, '^www\.', '');
  v_host := split_part(split_part(split_part(v_host, '/', 1), '?', 1), '#', 1);
  v_host := left(regexp_replace(v_host, '[^a-z0-9.-]', '', 'g'), 100);
  v_biz  := left(trim(both '-' from regexp_replace(lower(coalesce(p_business, '')), '[^a-z0-9]+', '-', 'g')), 60);
  -- NB: the site goes in as business_site, never as 'website' (capture_form treats 'website' as a spam honeypot).
  SELECT * INTO r FROM crm.capture_form(
    'beacon', 'signal-check-request',
    jsonb_strip_nulls(jsonb_build_object(
      'email', p_email, 'first_name', nullif(btrim(p_first_name), ''), 'last_name', nullif(btrim(p_last_name), ''),
      'source', left(coalesce(nullif(p_source, ''), 'beaconlabs.ai/signal-check'), 256),
      'business_name', left(p_business, 180), 'business_site', left(p_site, 500), 'site_host', nullif(v_host, ''),
      'industry', left(p_industry, 120), 'description', left(p_description, 2000),
      'request_consent', true, 'request_consent_text', left(p_consent_text, 1000), 'is_test', p_is_test)),
    jsonb_strip_nulls(jsonb_build_object('ip_hash', left(p_ip_hash, 128), 'user_agent', left(p_user_agent, 512), 'referer', left(p_source, 256))));
  IF r.contact_id IS NULL THEN RAISE EXCEPTION 'not stored' USING ERRCODE = '22023'; END IF;
  INSERT INTO contact_tags(contact_id, tag) VALUES (r.contact_id, 'signal-check-request') ON CONFLICT DO NOTHING;
  IF v_host <> '' THEN INSERT INTO contact_tags(contact_id, tag) VALUES (r.contact_id, 'site:' || v_host) ON CONFLICT DO NOTHING; END IF;
  IF v_biz  <> '' THEN INSERT INTO contact_tags(contact_id, tag) VALUES (r.contact_id, 'business:' || v_biz) ON CONFLICT DO NOTHING; END IF;
  UPDATE contacts SET custom_fields = custom_fields || jsonb_strip_nulls(jsonb_build_object(
      'last_signal_check_site', nullif(v_host, ''), 'last_signal_check_business', nullif(left(p_business, 180), ''))),
    updated_at = now() WHERE id = r.contact_id;
  RETURN QUERY SELECT r.contact_id, r.submission_id, r.contact_created, r.is_test;
END
$fn$;
ALTER FUNCTION crm.signal_check_request(text,text,text,text,text,text,text,boolean,text,text,text,text,boolean) OWNER TO crm_owner;
REVOKE ALL ON FUNCTION crm.signal_check_request(text,text,text,text,text,text,text,boolean,text,text,text,text,boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION crm.signal_check_request(text,text,text,text,text,text,text,boolean,text,text,text,text,boolean) TO crm_labs;

-- 2. Event history for what happened to a request (reply sent, fallback sent, failed, skipped). Existing contacts only.
CREATE OR REPLACE FUNCTION crm.signal_check_event(p_email text, p_event text, p_site text, p_detail jsonb DEFAULT '{}'::jsonb)
RETURNS TABLE (contact_id uuid, recorded boolean)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = crm, pg_temp AS $fn$
#variable_conflict use_column
DECLARE v_email text := lower(btrim(coalesce(p_email, ''))); v_cid uuid;
BEGIN
  IF p_event NOT IN ('first_read_sent','ack_sent','reply_failed','reply_skipped_duplicate','reply_skipped_rate_limit') THEN
    RAISE EXCEPTION 'unsupported event' USING ERRCODE = '22023'; END IF;
  IF octet_length(coalesce(p_detail, '{}'::jsonb)::text) > 4096 THEN RAISE EXCEPTION 'detail too large' USING ERRCODE = '22023'; END IF;
  SELECT c.id INTO v_cid FROM contacts c WHERE c.workspace_id = 'beacon' AND c.email = v_email;
  IF v_cid IS NULL THEN RETURN QUERY SELECT NULL::uuid, false; RETURN; END IF;
  INSERT INTO audit_events(workspace_id, actor, action, subject_id, detail)
  VALUES ('beacon', 'labs-signal-check', 'signal_check.' || p_event, v_cid::text,
          coalesce(p_detail, '{}'::jsonb) || jsonb_build_object('site', left(p_site, 100)));
  IF p_event = 'first_read_sent' THEN INSERT INTO contact_tags(contact_id, tag) VALUES (v_cid, 'signal-check-first-read-sent') ON CONFLICT DO NOTHING; END IF;
  IF p_event = 'ack_sent'        THEN INSERT INTO contact_tags(contact_id, tag) VALUES (v_cid, 'signal-check-ack-sent') ON CONFLICT DO NOTHING; END IF;
  RETURN QUERY SELECT v_cid, true;
END
$fn$;
ALTER FUNCTION crm.signal_check_event(text,text,text,jsonb) OWNER TO crm_owner;
REVOKE ALL ON FUNCTION crm.signal_check_event(text,text,text,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION crm.signal_check_event(text,text,text,jsonb) TO crm_labs;

-- 3. A SUCCESSFUL Labs payment only (Stripe payment_intent.succeeded). Declined/failed/incomplete payments never reach here,
--    and the function itself refuses anything but status 'succeeded'. Idempotent on the Stripe event id.
--    Live payments get the real tag purchased-<offer>; Stripe test-mode payments get test-purchase-<offer> + 'test' instead.
CREATE OR REPLACE FUNCTION crm.record_labs_purchase(
  p_stripe_event_id text, p_payment_intent_id text, p_status text, p_offer text, p_email text, p_name text,
  p_amount_minor integer, p_currency text, p_livemode boolean, p_business_site text, p_question text)
RETURNS TABLE (contact_id uuid, payment_recorded boolean, tag text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = crm, pg_temp AS $fn$
#variable_conflict use_column
DECLARE r record; v_tag text; v_n int; v_paid boolean; v_host text;
BEGIN
  IF p_status IS DISTINCT FROM 'succeeded' THEN RAISE EXCEPTION 'only succeeded payments are recorded' USING ERRCODE = '22023'; END IF;
  IF p_stripe_event_id IS NULL OR p_stripe_event_id !~ '^evt_[A-Za-z0-9_]{1,250}$' THEN RAISE EXCEPTION 'bad stripe event id' USING ERRCODE = '22023'; END IF;
  IF p_payment_intent_id IS NULL OR p_payment_intent_id !~ '^pi_[A-Za-z0-9_]{10,100}$' THEN RAISE EXCEPTION 'bad payment intent id' USING ERRCODE = '22023'; END IF;
  IF p_offer NOT IN ('labs-working-session') THEN RAISE EXCEPTION 'unsupported offer' USING ERRCODE = '22023'; END IF;
  IF p_amount_minor IS NULL OR p_amount_minor <= 0 THEN RAISE EXCEPTION 'bad amount' USING ERRCODE = '22023'; END IF;
  v_host := lower(btrim(coalesce(p_business_site, '')));
  v_host := regexp_replace(v_host, '^[a-z][a-z0-9+.-]*://', ''); v_host := regexp_replace(v_host, '^www\.', '');
  v_host := left(regexp_replace(split_part(split_part(split_part(v_host, '/', 1), '?', 1), '#', 1), '[^a-z0-9.-]', '', 'g'), 100);
  SELECT * INTO r FROM crm.capture_form(
    'beacon', 'labs-working-session-purchase',
    jsonb_strip_nulls(jsonb_build_object(
      'email', p_email, 'name', nullif(btrim(p_name), ''), 'source', 'beaconlabs.ai/working-session',
      'offer', p_offer, 'payment_intent', p_payment_intent_id, 'amount_minor', p_amount_minor, 'currency', lower(p_currency),
      'livemode', coalesce(p_livemode, false), 'business_site', left(p_business_site, 300), 'site_host', nullif(v_host, ''),
      'question', left(p_question, 480), 'is_test', NOT coalesce(p_livemode, false))),
    jsonb_build_object('stripe_event_id', p_stripe_event_id));
  IF r.contact_id IS NULL THEN RAISE EXCEPTION 'not stored' USING ERRCODE = '22023'; END IF;
  v_tag := CASE WHEN coalesce(p_livemode, false) THEN 'purchased-' || p_offer ELSE 'test-purchase-' || p_offer END;
  INSERT INTO contact_tags(contact_id, tag) VALUES (r.contact_id, v_tag) ON CONFLICT DO NOTHING;
  IF NOT coalesce(p_livemode, false) THEN INSERT INTO contact_tags(contact_id, tag) VALUES (r.contact_id, 'test') ON CONFLICT DO NOTHING; END IF;
  IF v_host <> '' THEN INSERT INTO contact_tags(contact_id, tag) VALUES (r.contact_id, 'site:' || v_host) ON CONFLICT DO NOTHING; END IF;
  INSERT INTO payment_events(stripe_event_id, workspace_id, contact_id, event_type, amount_minor, currency)
  VALUES (p_stripe_event_id, 'beacon', r.contact_id, 'payment_intent.succeeded', p_amount_minor, lower(p_currency))
  ON CONFLICT (stripe_event_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT; v_paid := v_n = 1;
  INSERT INTO audit_events(workspace_id, actor, action, subject_id, detail)
  VALUES ('beacon', 'labs-purchase-webhook', 'stripe:payment_intent.succeeded', r.contact_id::text,
          jsonb_build_object('stripe_event_id', p_stripe_event_id, 'payment_intent', p_payment_intent_id, 'offer', p_offer,
                             'amount_minor', p_amount_minor, 'livemode', coalesce(p_livemode, false), 'tag', v_tag, 'first_time', v_paid));
  RETURN QUERY SELECT r.contact_id, v_paid, v_tag;
END
$fn$;
ALTER FUNCTION crm.record_labs_purchase(text,text,text,text,text,text,integer,text,boolean,text,text) OWNER TO crm_owner;
REVOKE ALL ON FUNCTION crm.record_labs_purchase(text,text,text,text,text,text,integer,text,boolean,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION crm.record_labs_purchase(text,text,text,text,text,text,integer,text,boolean,text,text) TO crm_purchases;

-- Read-only view for Bob: one row per Signal Check requester, with their tags and last event.
CREATE OR REPLACE VIEW crm.labs_contacts AS
SELECT c.id, c.email, c.first_name, c.last_name, c.is_test, c.created_at AT TIME ZONE 'America/New_York' AS created_et,
       array_agg(t.tag ORDER BY t.tag) AS tags,
       (SELECT count(*) FROM crm.form_submissions s WHERE s.contact_id = c.id) AS submissions
FROM crm.contacts c JOIN crm.contact_tags t ON t.contact_id = c.id
WHERE c.workspace_id = 'beacon' AND c.id IN (SELECT contact_id FROM crm.contact_tags WHERE tag IN ('signal-check-request') OR tag LIKE 'purchased-labs-%' OR tag LIKE 'test-purchase-labs-%')
GROUP BY c.id ORDER BY c.created_at DESC;
ALTER VIEW crm.labs_contacts OWNER TO crm_owner;
GRANT SELECT ON crm.labs_contacts TO crm_reader;

INSERT INTO schema_migrations(version) VALUES ('0006_labs_signal_check_and_purchases');
COMMIT;
