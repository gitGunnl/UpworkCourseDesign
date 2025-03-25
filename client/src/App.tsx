import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import AuthPage from "@/pages/AuthPage";
import DummyPanelPage from "@/pages/DummyPanelPage";
import ControlPanelPage from "@/pages/ControlPanelPage";
import AICourseDetailPage from "@/pages/AICourseDetailPage";
import CourseLearningPage from "@/pages/CourseLearningPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/panel" component={DummyPanelPage} />
          <Route path="/control" component={ControlPanelPage} />
          <Route path="/course/ai" component={AICourseDetailPage} />
          <Route path="/course/ai/learn" component={CourseLearningPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
