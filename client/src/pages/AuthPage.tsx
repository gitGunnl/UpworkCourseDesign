import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    // In a real app, this would call an API
    login();
    toast({
      title: "Logged in successfully",
      description: "Welcome back!",
    });
    navigate("/");
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    // In a real app, this would call an API
    login();
    toast({
      title: "Account created",
      description: "Your account has been created successfully!",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex-1 py-3 font-semibold ${activeTab === "login"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("login")}
            >
              Log In
            </button>
            <button
              className={`flex-1 py-3 font-semibold ${activeTab === "register"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-1">
                        <FormLabel>Password</FormLabel>
                        <a href="#" className="text-sm text-primary-600 hover:underline">
                          Forgot Password?
                        </a>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full py-3 mb-4">
                  Log In
                </Button>

                <div className="relative flex items-center justify-center mb-4">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-4 text-sm text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button" className="flex items-center justify-center gap-2 py-2 px-4">
                    <span className="material-icons text-blue-500">facebook</span>
                    <span className="text-sm">Facebook</span>
                  </Button>
                  <Button variant="outline" type="button" className="flex items-center justify-center gap-2 py-2 px-4">
                    <span className="material-icons text-red-500">email</span>
                    <span className="text-sm">Google</span>
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters long with numbers and special characters.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full py-3 mb-4">
                  Create Account
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  By registering, you agree to our{" "}
                  <a href="#" className="text-primary-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary-600 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
