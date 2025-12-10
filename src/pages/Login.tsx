import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { LogIn, Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import { baseURL } from "../constant";


export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // const { login } = useAuth(); // If using auth context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store tokens and user data
        localStorage.setItem('token', data.data?.token || '');
        localStorage.setItem('user', JSON.stringify(data.data?.user || {}));
        
        toast.success("Login successful!");
        
        // Redirect based on user role
        const user = data.data?.user;
        if (user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
        
        // Clear form
        setFormData({ email: "", password: "" });
        
        // If using auth context
        // if (login) login(data.data?.token, data.data?.user);
        
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'student' | 'admin') => {
    setIsLoading(true);
    
    const demoCredentials = {
      student: { email: "student@demo.com", password: "demo123" },
      admin: { email: "admin@demo.com", password: "admin123" }
    };
    
    try {
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demoCredentials[role]),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.data?.token || '');
        localStorage.setItem('user', JSON.stringify(data.data?.user || {}));
        
        toast.success(`Demo ${role} login successful!`);
        
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error("Demo login failed. Please use regular login.");
      }
    } catch (error) {
      console.error('Demo login error:', error);
      toast.error("Demo login failed. Please use regular login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      {/* Logo/Brand */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Binarify Academy
          </h1>
        </div>
        <p className="text-gray-600">Sign in to access your account</p>
      </div>

      {/* Login Card */}
      <Card className="max-w-md shadow-xl border-gray-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-4">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="  you@example.com"
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="  Enter your password"
                  className="pl-10 pr-10"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Demo Login Section */}
          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick demo access</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDemoLogin('student')}
                disabled={isLoading}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Student Demo
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDemoLogin('admin')}
                disabled={isLoading}
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Admin Demo
              </Button>
            </div>
          </div> */}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 border-t border-gray-100 pt-6">
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/apply" 
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Apply now
            </Link>
          </div>
          
          <div className="text-center">
            <Link 
              to="/" 
              className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
            >
              ← Back to homepage
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Additional Info */}
      <div className="mt-8 text-center max-w-md">
        <p className="text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Need help?{" "}
          <a 
            href="mailto:support@binarify.com" 
            className="text-blue-600 hover:underline"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}