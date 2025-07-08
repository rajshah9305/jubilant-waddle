import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ApiKeyProvider } from "@/hooks/use-api-key";
import { ThemeProvider } from "@/hooks/use-theme";
import Dashboard from "@/pages/dashboard";
import Studio from "@/pages/studio";
import Projects from "@/pages/projects";
import Analytics from "@/pages/analytics";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";

function Router() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/studio/:studioType?" component={Studio} />
        <Route path="/projects" component={Projects} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <ApiKeyProvider>
            <Toaster />
            <Router />
          </ApiKeyProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
