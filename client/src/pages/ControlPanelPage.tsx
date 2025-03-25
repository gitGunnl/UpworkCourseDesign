import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ControlPanelPage = () => {
  const { isLoggedIn, setLoginStatus } = useAuth();
  const [checked, setChecked] = useState(isLoggedIn);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Sync the switch state with the auth context
  useEffect(() => {
    setChecked(isLoggedIn);
  }, [isLoggedIn]);

  const handleToggleChange = (checked: boolean) => {
    setChecked(checked);
    setLoginStatus(checked);
    toast({
      title: "Login Status Changed",
      description: checked 
        ? "You are now logged in." 
        : "You are now logged out.",
    });
  };

  const pages = [
    { 
      name: "Landing Page", 
      path: "/", 
      description: "Main course listing page. Behavior changes based on login status."
    },
    { 
      name: "Auth Page", 
      path: "/auth", 
      description: "Login and registration forms."
    },
    { 
      name: "Dummy Panel", 
      path: "/panel", 
      description: "Original test panel for login state."
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Control Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Login Status</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Current status: {checked ? "Logged In" : "Not Logged In"}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {checked
                    ? "User is authenticated. \"Enroll Now\" buttons will open payment modal."
                    : "User is not authenticated. \"Enroll Now\" buttons will redirect to login page."}
                </p>
              </div>
              <Switch
                checked={checked}
                onCheckedChange={handleToggleChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Screenshot Guide</h2>
            <div className="text-sm text-gray-700 space-y-2">
              <p>This control panel lets you:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Toggle login state without going through login process</li>
                <li>Access all pages directly for easy screenshotting</li>
                <li>See different behaviors based on login state</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Available Pages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <Card key={page.path} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">{page.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{page.description}</p>
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(page.path)}
                >
                  View Page
                </Button>
                <span className="text-xs text-gray-500">URL: {page.path}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">View States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Logged In View</h3>
              <p className="text-sm text-gray-600 mb-4">
                Shows the landing page with "Enroll Now" buttons that open the payment modal.
              </p>
              <Button
                onClick={() => {
                  setLoginStatus(true);
                  navigate("/");
                  toast({
                    title: "Logged In",
                    description: "Navigating to logged-in landing page view.",
                  });
                }}
              >
                View Logged In State
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Logged Out View</h3>
              <p className="text-sm text-gray-600 mb-4">
                Shows the landing page with "Enroll Now" buttons that redirect to login page.
              </p>
              <Button
                onClick={() => {
                  setLoginStatus(false);
                  navigate("/");
                  toast({
                    title: "Logged Out",
                    description: "Navigating to logged-out landing page view.",
                  });
                }}
              >
                View Logged Out State
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ControlPanelPage;