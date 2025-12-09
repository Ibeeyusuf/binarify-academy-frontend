import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { LogIn, Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    // const { login } = useAuth(); // If using auth context
    const handleSubmit = async (e) => {
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
            const response = await fetch('http://localhost:8000/api/auth/login', {
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
                }
                else {
                    navigate('/dashboard');
                }
                // Clear form
                setFormData({ email: "", password: "" });
                // If using auth context
                // if (login) login(data.data?.token, data.data?.user);
            }
            else {
                toast.error(data.message || "Login failed");
            }
        }
        catch (error) {
            console.error('Login error:', error);
            toast.error("Login failed. Please check your connection and try again.");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleDemoLogin = async (role) => {
        setIsLoading(true);
        const demoCredentials = {
            student: { email: "student@demo.com", password: "demo123" },
            admin: { email: "admin@demo.com", password: "admin123" }
        };
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
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
                }
                else {
                    navigate('/dashboard');
                }
            }
            else {
                toast.error("Demo login failed. Please use regular login.");
            }
        }
        catch (error) {
            console.error('Demo login error:', error);
            toast.error("Demo login failed. Please use regular login.");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4", children: [_jsxs("div", { className: "mb-8 text-center", children: [_jsxs("div", { className: "flex items-center justify-center space-x-2 mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center", children: _jsx(Lock, { className: "w-6 h-6 text-white" }) }), _jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent", children: "Binarify Academy" })] }), _jsx("p", { className: "text-gray-600", children: "Sign in to access your account" })] }), _jsxs(Card, { className: "max-w-md shadow-xl border-gray-200", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsxs(CardTitle, { className: "text-2xl font-bold text-center flex items-center justify-center", children: [_jsx(LogIn, { className: "w-5 h-5 mr-2" }), "Sign In"] }), _jsx(CardDescription, { className: "text-center", children: "Enter your credentials to access your dashboard" })] }), _jsxs(CardContent, { children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", children: _jsx(Mail, { className: "w-4 h-4" }) }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), placeholder: "  you@example.com", className: "pl-10", required: true, disabled: isLoading })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }), _jsx(Link, { to: "/forgot-password", className: "text-sm text-blue-600 hover:text-blue-800 hover:underline", children: "Forgot password?" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", children: _jsx(Lock, { className: "w-4 h-4" }) }), _jsx(Input, { id: "password", type: showPassword ? "text" : "password", value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), placeholder: "  Enter your password", className: "pl-10 pr-10", required: true, disabled: isLoading }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600", disabled: isLoading, children: showPassword ? (_jsx(EyeOff, { className: "w-4 h-4" })) : (_jsx(Eye, { className: "w-4 h-4" })) })] })] }), _jsx(Button, { type: "submit", className: "w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-4 w-4 text-white", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Signing in..."] })) : (_jsxs(_Fragment, { children: ["Sign In", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] })) })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-white text-gray-500", children: "Quick demo access" }) })] }), _jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => handleDemoLogin('student'), disabled: isLoading, className: "border-blue-200 text-blue-700 hover:bg-blue-50", children: "Student Demo" }), _jsx(Button, { type: "button", variant: "outline", onClick: () => handleDemoLogin('admin'), disabled: isLoading, className: "border-purple-200 text-purple-700 hover:bg-purple-50", children: "Admin Demo" })] })] })] }), _jsxs(CardFooter, { className: "flex flex-col space-y-4 border-t border-gray-100 pt-6", children: [_jsxs("div", { className: "text-center text-sm text-gray-600", children: ["Don't have an account?", " ", _jsx(Link, { to: "/apply", className: "font-medium text-blue-600 hover:text-blue-800 hover:underline", children: "Apply now" })] }), _jsx("div", { className: "text-center", children: _jsx(Link, { to: "/", className: "text-sm text-gray-500 hover:text-gray-700 hover:underline", children: "\u2190 Back to homepage" }) })] })] }), _jsxs("div", { className: "mt-8 text-center max-w-md", children: [_jsxs("p", { className: "text-sm text-gray-500", children: ["By signing in, you agree to our", " ", _jsx(Link, { to: "/terms", className: "text-blue-600 hover:underline", children: "Terms of Service" }), " ", "and", " ", _jsx(Link, { to: "/privacy", className: "text-blue-600 hover:underline", children: "Privacy Policy" })] }), _jsxs("p", { className: "text-xs text-gray-400 mt-4", children: ["Need help?", " ", _jsx("a", { href: "mailto:support@binarify.com", className: "text-blue-600 hover:underline", children: "Contact support" })] })] })] }));
}
