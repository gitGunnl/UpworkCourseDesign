import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const DummyPanelPage = () => {
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
  };

  const handleApplySettings = () => {
    setLoginStatus(checked);
    toast({
      title: "Settings Applied",
      description: checked 
        ? "You are now logged in. Enroll buttons will open payment modal." 
        : "You are now logged out. Enroll buttons will redirect to login page.",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-lg mx-auto">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Dummy Control Panel
          </h2>

          <div className="mb-6">
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-900">Login Status</h3>
                <p className="text-sm text-gray-500">
                  Toggle to simulate logged in/out state
                </p>
              </div>
              <Switch
                checked={checked}
                onCheckedChange={handleToggleChange}
              />
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-3">
                Current Status:
              </h3>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2">
                  <span className={`material-icons ${checked ? "text-green-500" : "text-red-500"}`}>
                    {checked ? "login" : "logout"}
                  </span>
                  <span className="font-medium">
                    {checked ? "Logged In" : "Not Logged In"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {checked
                    ? "User is authenticated. \"Enroll Now\" buttons will open payment modal."
                    : "User is currently not authenticated. \"Enroll Now\" buttons will redirect to login page."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/")}>
              <span className="material-icons text-sm mr-1">arrow_back</span>
              Back to Home
            </Button>
            <Button onClick={handleApplySettings}>
              Apply Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DummyPanelPage;
