import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export function LoginModal({ isOpen, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all required fields");
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
                localStorage.setItem('token', data.data?.token || '');
                localStorage.setItem('user', JSON.stringify(data.data?.user || {}));
                toast.success("Login successful!");
                onClose();
                navigate("/dashboard");
                setFormData({ email: "", password: "" });
            }
            else {
                toast.error(data.message || "Login failed");
            }
        }
        catch (error) {
            console.error('Login error:', error);
            toast.error("Login failed. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "max-w-md", children: [_jsxs(DialogHeader, { children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(DialogTitle, { children: "Login" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsx(DialogDescription, { children: "Enter your credentials to access the dashboard" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), placeholder: "Enter your email", required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), placeholder: "Enter your password", required: true })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Logging in..." : "Login" })] })] }) }));
}
