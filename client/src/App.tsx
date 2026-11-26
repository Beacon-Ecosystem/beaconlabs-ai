import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SignalCheck from "./pages/SignalCheck";
import Privacy from "./pages/Privacy";
import FounderBrief from "./pages/FounderBrief";
import PatchPilotResource from "./pages/PatchPilotResource";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      {/* Retired Nov 2026: old agency catalog and funnels. Old links land on a live page. */}
      <Route path={"/pricing"}>
        <Redirect to="/" replace />
      </Route>
      <Route path={"/services"}>
        <Redirect to="/" replace />
      </Route>
      <Route path={"/ecommerce"}>
        <Redirect to="/signal-check" replace />
      </Route>
      <Route path={"/coaches"}>
        <Redirect to="/signal-check" replace />
      </Route>
      <Route path={"/growth-blueprint"}>
        <Redirect to="/signal-check" replace />
      </Route>
      <Route path={"/blueprint-thank-you"}>
        <Redirect to="/signal-check" replace />
      </Route>
      <Route path={"/audit"}>
        <Redirect to="/signal-check" replace />
      </Route>
      <Route path={"/signal-check"} component={SignalCheck} />
      <Route path={"/founder-brief"} component={FounderBrief} />
      <Route path={"/patchpilot"} component={PatchPilotResource} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
