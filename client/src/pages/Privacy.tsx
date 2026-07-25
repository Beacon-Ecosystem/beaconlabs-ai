import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/**
 * Beacon Labs Privacy Notice — Signal Check intake controls.
 * This operational notice is intentionally limited to the information the
 * public Beacon Labs forms currently collect and the systems they use.
 */
export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="px-6 py-28">
        <article className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[#00d4ff]">Beacon Labs</p>
          <h1 className="mb-4 text-4xl font-bold">Privacy Notice</h1>
          <p className="mb-10 text-sm text-gray-400">Effective July 25, 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="mb-2 text-xl font-semibold text-white">What this notice covers</h2>
              <p>
                This notice explains how Beacon Labs, a Beacon Momentum, LLC company, handles
                information submitted through the Signal Check request form and related Beacon Labs
                contact forms.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-white">Information we collect</h2>
              <p>
                The Signal Check form may collect your name, email address, business name, website,
                industry, and the information you choose to provide about your business. Please do
                not submit sensitive personal information through this form.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-white">How we use it</h2>
              <p>
                We use submitted information to record, review, and respond to your Signal Check
                request; manage the related customer relationship record; and protect the integrity
                and security of our services. We do not use a Signal Check submission to sell your
                personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-white">Service providers and retention</h2>
              <p>
                We may use hosted website, CRM, and communications providers to process the request
                on our behalf. We retain submission information only as long as reasonably needed to
                respond, maintain business records, resolve issues, and meet applicable obligations.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-white">Your choices</h2>
              <p>
                You may ask us to update or delete information associated with your request, subject
                to applicable recordkeeping needs. To make a request or ask a privacy question, use
                the contact information provided on Beacon Labs’ website and identify the email
                address used for your submission.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-white">Changes to this notice</h2>
              <p>
                We may update this notice when our forms, processing practices, or legal obligations
                change. The effective date above identifies the current version.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
