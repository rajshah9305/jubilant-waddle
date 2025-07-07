import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ApiKeyProvider } from "@/hooks/use-api-key";
import Dashboard from "@/pages/dashboard";
import Studio from "@/pages/studio";
import Projects from "@/pages/projects";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/studio/:studioType?" component={Studio} />
        <Route path="/projects" component={Projects} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ApiKeyProvider>
          <Toaster />
          <Router />
        </ApiKeyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
