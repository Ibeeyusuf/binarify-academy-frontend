import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { CheckCircle, Calendar, User, BookOpen, ArrowRight, Code, Database, Bug, Settings, Briefcase, CreditCard, Clock, LogIn } from "lucide-react";
import { toast } from "sonner";
import { applicationService } from "../services/api";
import paymentService from "../services/api/paymentService";
export function ApplicationModal({ isOpen, onClose, selectedTrack, selectedProgram }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applicationSuccess, setApplicationSuccess] = useState(false);
    const [submittedApplicationId, setSubmittedApplicationId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+234",
        phone: "",
        country: "",
        state: "",
        password: "",
        confirmPassword: "",
        // Program Selection
        track: selectedTrack || "",
        program: selectedProgram || "",
        // Background
        education: "",
        experience: "",
        currentRole: "",
        motivation: "",
        goals: "",
        // Additional
        preferredStartDate: "",
        availableHours: "",
        referralSource: "",
        hasLaptop: false,
        agreeToTerms: false,
        wantsUpdates: true
    });
    const tracks = [
        { value: "project-management", label: "Project Management", icon: _jsx(Briefcase, { className: "w-4 h-4" }) },
        { value: "frontend-development", label: "Frontend Development", icon: _jsx(Code, { className: "w-4 h-4" }) },
        { value: "backend-development", label: "Backend Development", icon: _jsx(Database, { className: "w-4 h-4" }) },
        { value: "quality-assurance", label: "Quality Assurance", icon: _jsx(Bug, { className: "w-4 h-4" }) },
        { value: "devops", label: "DevOps", icon: _jsx(Settings, { className: "w-4 h-4" }) }
    ];
    const programs = [
        {
            value: "launchpad",
            label: "LaunchPad Track",
            duration: "8 weeks",
            price: "₦105,000",
            description: "Essential skills for career entry"
        },
        {
            value: "professional",
            label: "Professional Track",
            duration: "12 weeks",
            price: "₦205,000",
            description: "Advanced training with internship"
        }
    ];
    const countryCodes = [
        { value: "+234", label: "+234", country: "Nigeria", flag: "🇳🇬" },
        { value: "+233", label: "+233", country: "Ghana", flag: "🇬🇭" },
        { value: "+27", label: "+27", country: "South Africa", flag: "🇿🇦" },
        { value: "+254", label: "+254", country: "Kenya", flag: "🇰🇪" },
        { value: "+256", label: "+256", country: "Uganda", flag: "🇺🇬" },
        { value: "+250", label: "+250", country: "Rwanda", flag: "🇷🇼" },
        { value: "+255", label: "+255", country: "Tanzania", flag: "🇹🇿" },
        { value: "+251", label: "+251", country: "Ethiopia", flag: "🇪🇹" },
        { value: "+237", label: "+237", country: "Cameroon", flag: "🇨🇲" },
        { value: "+225", label: "+225", country: "Ivory Coast", flag: "🇨🇮" },
        { value: "+221", label: "+221", country: "Senegal", flag: "🇸🇳" },
        { value: "+212", label: "+212", country: "Morocco", flag: "🇲🇦" },
        { value: "+20", label: "+20", country: "Egypt", flag: "🇪🇬" },
        { value: "+1", label: "+1", country: "USA/Canada", flag: "🇺🇸" },
        { value: "+44", label: "+44", country: "UK", flag: "🇬🇧" },
        { value: "+49", label: "+49", country: "Germany", flag: "🇩🇪" },
        { value: "+33", label: "+33", country: "France", flag: "🇫🇷" },
    ];
    const countries = [
        { value: "nigeria", label: "Nigeria" },
        { value: "ghana", label: "Ghana" },
        { value: "south-africa", label: "South Africa" },
        { value: "kenya", label: "Kenya" },
        { value: "uganda", label: "Uganda" },
        { value: "rwanda", label: "Rwanda" },
        { value: "tanzania", label: "Tanzania" },
        { value: "ethiopia", label: "Ethiopia" },
        { value: "cameroon", label: "Cameroon" },
        { value: "ivory-coast", label: "Ivory Coast" },
        { value: "senegal", label: "Senegal" },
        { value: "morocco", label: "Morocco" },
        { value: "egypt", label: "Egypt" },
        { value: "usa", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "canada", label: "Canada" },
        { value: "germany", label: "Germany" },
        { value: "france", label: "France" },
        { value: "other", label: "Other Country" }
    ];
    const statesByCountry = {
        nigeria: [
            { value: "abia", label: "Abia" },
            { value: "adamawa", label: "Adamawa" },
            { value: "akwa-ibom", label: "Akwa Ibom" },
            { value: "anambra", label: "Anambra" },
            { value: "bauchi", label: "Bauchi" },
            { value: "bayelsa", label: "Bayelsa" },
            { value: "benue", label: "Benue" },
            { value: "borno", label: "Borno" },
            { value: "cross-river", label: "Cross River" },
            { value: "delta", label: "Delta" },
            { value: "ebonyi", label: "Ebonyi" },
            { value: "edo", label: "Edo" },
            { value: "ekiti", label: "Ekiti" },
            { value: "enugu", label: "Enugu" },
            { value: "fct", label: "Federal Capital Territory (Abuja)" },
            { value: "gombe", label: "Gombe" },
            { value: "imo", label: "Imo" },
            { value: "jigawa", label: "Jigawa" },
            { value: "kaduna", label: "Kaduna" },
            { value: "kano", label: "Kano" },
            { value: "katsina", label: "Katsina" },
            { value: "kebbi", label: "Kebbi" },
            { value: "kogi", label: "Kogi" },
            { value: "kwara", label: "Kwara" },
            { value: "lagos", label: "Lagos" },
            { value: "nasarawa", label: "Nasarawa" },
            { value: "niger", label: "Niger" },
            { value: "ogun", label: "Ogun" },
            { value: "ondo", label: "Ondo" },
            { value: "osun", label: "Osun" },
            { value: "oyo", label: "Oyo" },
            { value: "plateau", label: "Plateau" },
            { value: "rivers", label: "Rivers" },
            { value: "sokoto", label: "Sokoto" },
            { value: "taraba", label: "Taraba" },
            { value: "yobe", label: "Yobe" },
            { value: "zamfara", label: "Zamfara" }
        ],
        ghana: [
            { value: "greater-accra", label: "Greater Accra" },
            { value: "ashanti", label: "Ashanti" },
            { value: "western", label: "Western" },
            { value: "eastern", label: "Eastern" },
            { value: "central", label: "Central" },
            { value: "volta", label: "Volta" },
            { value: "northern", label: "Northern" },
            { value: "upper-east", label: "Upper East" },
            { value: "upper-west", label: "Upper West" },
            { value: "bono", label: "Bono" },
            { value: "ahafo", label: "Ahafo" },
            { value: "bono-east", label: "Bono East" },
            { value: "oti", label: "Oti" },
            { value: "savannah", label: "Savannah" },
            { value: "north-east", label: "North East" }
        ],
        "south-africa": [
            { value: "gauteng", label: "Gauteng" },
            { value: "western-cape", label: "Western Cape" },
            { value: "eastern-cape", label: "Eastern Cape" },
            { value: "kwa-zulu-natal", label: "KwaZulu-Natal" },
            { value: "limpopo", label: "Limpopo" },
            { value: "mpumalanga", label: "Mpumalanga" },
            { value: "north-west", label: "North West" },
            { value: "free-state", label: "Free State" },
            { value: "northern-cape", label: "Northern Cape" }
        ],
        kenya: [
            { value: "nairobi", label: "Nairobi" },
            { value: "mombasa", label: "Mombasa" },
            { value: "kisumu", label: "Kisumu" },
            { value: "nakuru", label: "Nakuru" },
            { value: "eldoret", label: "Eldoret" }
        ]
    };
    const paymentOptions = [
        {
            id: "paystack",
            title: "Pay Now",
            description: "Secure payment via Paystack. Complete your enrollment instantly.",
            icon: _jsx(CreditCard, { className: "w-6 h-6" }),
            color: "bg-gradient-to-r from-green-500 to-emerald-600",
            action: "paystack"
        },
        {
            id: "login",
            title: "Login & Pay Later",
            description: "Already have an account? Login to access your dashboard and make payment.",
            icon: _jsx(LogIn, { className: "w-6 h-6" }),
            color: "bg-gradient-to-r from-blue-500 to-blue-600",
            action: "login"
        },
        {
            id: "later",
            title: "Pay Later",
            description: "Submit application now, pay within 24 hours to secure your spot.",
            icon: _jsx(Clock, { className: "w-6 h-6" }),
            color: "bg-gradient-to-r from-purple-500 to-purple-600",
            action: "later"
        }
    ];
    const getStatesForCountry = (country) => {
        return statesByCountry[country] || [];
    };
    const handleInputChange = (field, value) => {
        if (field === "country") {
            setFormData(prev => ({ ...prev, [field]: value, state: "" }));
        }
        else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step < 3) {
            // Validation for steps 1 and 2
            if (step === 1) {
                if (!formData.firstName || !formData.lastName || !formData.email ||
                    !formData.phone || !formData.country || !formData.state ||
                    !formData.password || !formData.confirmPassword) {
                    toast.error("Please fill in all required fields");
                    return;
                }
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    toast.error("Please enter a valid email address");
                    return;
                }
                // Password validation
                if (formData.password.length < 8) {
                    toast.error("Password must be at least 8 characters long");
                    return;
                }
                // Password strength validation
                const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
                if (!passwordRegex.test(formData.password)) {
                    toast.error("Password must contain both letters and numbers");
                    return;
                }
                // Check if passwords match
                if (formData.password !== formData.confirmPassword) {
                    toast.error("Passwords do not match");
                    return;
                }
                setStep(2);
                return;
            }
            if (step === 2) {
                if (!formData.track || !formData.program || !formData.motivation) {
                    toast.error("Please complete all program selection fields");
                    return;
                }
                setStep(3);
                return;
            }
        }
        if (step === 3) {
            if (!formData.agreeToTerms) {
                toast.error("Please agree to the terms and conditions");
                return;
            }
            setIsSubmitting(true);
            try {
                const submissionData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    countryCode: formData.countryCode,
                    phone: formData.phone,
                    country: formData.country,
                    state: formData.state,
                    track: formData.track,
                    program: formData.program,
                    motivation: formData.motivation,
                    agreeToTerms: formData.agreeToTerms,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    education: formData.education || undefined,
                    experience: formData.experience || undefined,
                    currentRole: formData.currentRole || undefined,
                    goals: formData.goals || undefined,
                    preferredStartDate: formData.preferredStartDate || undefined,
                    availableHours: formData.availableHours || undefined,
                    referralSource: formData.referralSource || undefined,
                    hasLaptop: formData.hasLaptop,
                    wantsUpdates: formData.wantsUpdates
                };
                const response = await applicationService.submitApplication(submissionData);
                if (response.success) {
                    // Store application ID for payment
                    setSubmittedApplicationId(response.data.applicationId || response.data.id);
                    setApplicationSuccess(true);
                    toast.success("Application submitted successfully!");
                }
                else {
                    if (response.errors && response.errors.length > 0) {
                        const errorMessages = response.errors
                            .map(err => `${err.field}: ${err.message}`)
                            .join(', ');
                        toast.error(`Validation errors: ${errorMessages}`);
                    }
                    else {
                        toast.error(response.message || "Failed to submit application");
                    }
                }
            }
            catch (error) {
                console.error('Submission error:', error);
                if (error.response?.data?.errors) {
                    const errorMessages = error.response.data.errors
                        .map((err) => `${err.field}: ${err.message}`)
                        .join(', ');
                    toast.error(`Validation errors: ${errorMessages}`);
                }
                else {
                    toast.error("Failed to submit application. Please check your connection and try again.");
                }
            }
            finally {
                setIsSubmitting(false);
            }
        }
    };
    const getProgramPrice = (program) => {
        const programInfo = programs.find(p => p.value === program);
        if (!programInfo)
            return 0;
        // Extract number from price string like "₦105,000"
        const priceString = programInfo.price.replace(/[^0-9]/g, '');
        return parseInt(priceString) || 0;
    };
    const handlePaymentMethodSelect = async (method) => {
        setPaymentMethod(method.id);
        switch (method.action) {
            case "paystack":
                await handlePaystackPayment();
                break;
            case "login":
                handleLoginRedirect();
                break;
            case "later":
                handlePayLater();
                break;
        }
    };
    const handlePaystackPayment = async () => {
        if (!submittedApplicationId) {
            toast.error("Application ID not found");
            return;
        }
        setIsProcessingPayment(true);
        try {
            // Initialize payment with backend
            const paymentResponse = await paymentService.initializePayment({
                applicationId: submittedApplicationId,
                program: formData.program,
                track: formData.track,
                amount: getProgramPrice(formData.program),
                email: formData.email,
                metadata: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    track: formData.track,
                    program: formData.program
                }
            });
            if (paymentResponse.success && paymentResponse.data.authorization_url) {
                // Redirect to Paystack checkout
                window.location.href = paymentResponse.data.authorization_url;
            }
            else {
                toast.error(paymentResponse.message || "Payment initialization failed");
            }
        }
        catch (error) {
            console.error('Payment error:', error);
            toast.error(error.message || "Failed to initialize payment");
        }
        finally {
            setIsProcessingPayment(false);
        }
    };
    const handleLoginRedirect = () => {
        toast.info("Redirecting to login...");
        onClose();
        setTimeout(() => {
            navigate("/login", {
                state: {
                    message: "Please login to complete your application payment",
                    email: formData.email
                }
            });
        }, 500);
    };
    const handlePayLater = () => {
        toast.success("Application submitted! You have 24 hours to complete payment.");
        setTimeout(() => {
            onClose();
            resetForm();
        }, 2000);
    };
    const resetForm = () => {
        setStep(1);
        setApplicationSuccess(false);
        setSubmittedApplicationId(null);
        setPaymentMethod("");
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "+234",
            phone: "",
            country: "",
            state: "",
            password: "",
            confirmPassword: "",
            track: selectedTrack || "",
            program: selectedProgram || "",
            education: "",
            experience: "",
            currentRole: "",
            motivation: "",
            goals: "",
            preferredStartDate: "",
            availableHours: "",
            referralSource: "",
            hasLaptop: false,
            agreeToTerms: false,
            wantsUpdates: true
        });
    };
    const renderStep1 = () => (_jsxs(motion.div, { initial: { x: 300, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -300, opacity: 0 }, transition: { duration: 0.3 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(User, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Personal Information" }), _jsx("p", { className: "text-gray-600", children: "Let's start with your basic details" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "firstName", children: "First Name *" }), _jsx(Input, { id: "firstName", value: formData.firstName, onChange: (e) => handleInputChange("firstName", e.target.value), className: "mt-1", placeholder: "Enter your first name" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "lastName", children: "Last Name *" }), _jsx(Input, { id: "lastName", value: formData.lastName, onChange: (e) => handleInputChange("lastName", e.target.value), className: "mt-1", placeholder: "Enter your last name" })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "email", children: "Email Address *" }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: (e) => handleInputChange("email", e.target.value), className: "mt-1", placeholder: "Enter your email address" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "countryCode", children: "Country Code *" }), _jsxs(Select, { value: formData.countryCode, onValueChange: (value) => handleInputChange("countryCode", value), children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, { placeholder: "Select code" }) }), _jsx(SelectContent, { position: "popper", sideOffset: 4, className: "max-h-[300px]", children: countryCodes.map((code) => (_jsxs(SelectItem, { value: code.value, children: [code.flag, " ", code.label] }, code.value))) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "phone", children: "Phone Number *" }), _jsx(Input, { id: "phone", type: "tel", value: formData.phone, onChange: (e) => handleInputChange("phone", e.target.value), className: "mt-1", placeholder: "Enter your phone number" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "country", children: "Country *" }), _jsxs(Select, { value: formData.country, onValueChange: (value) => handleInputChange("country", value), children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, { placeholder: "Select your country" }) }), _jsx(SelectContent, { children: countries.map((country) => (_jsx(SelectItem, { value: country.value, children: country.label }, country.value))) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "state", children: "State/Region *" }), _jsxs(Select, { value: formData.state, onValueChange: (value) => handleInputChange("state", value), disabled: !formData.country, children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, { placeholder: formData.country ? "Select state/region" : "Select country first" }) }), _jsxs(SelectContent, { children: [getStatesForCountry(formData.country).map((state) => (_jsx(SelectItem, { value: state.value, children: state.label }, state.value))), formData.country && getStatesForCountry(formData.country).length === 0 && (_jsx(SelectItem, { value: "not-specified", children: "Region not specified" }))] })] })] })] }), _jsxs("div", { className: "space-y-4 pt-4 border-t border-gray-200", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "password", className: "text-base font-medium", children: "Create Login Password *" }), _jsx(Input, { id: "password", type: "password", value: formData.password, onChange: (e) => handleInputChange("password", e.target.value), className: "mt-2", placeholder: "Enter your password", required: true }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Minimum 8 characters with letters and numbers" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "confirmPassword", className: "text-base font-medium", children: "Confirm Password *" }), _jsx(Input, { id: "confirmPassword", type: "password", value: formData.confirmPassword, onChange: (e) => handleInputChange("confirmPassword", e.target.value), className: "mt-2", placeholder: "Re-enter your password", required: true })] })] })] }));
    const renderStep2 = () => (_jsxs(motion.div, { initial: { x: 300, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -300, opacity: 0 }, transition: { duration: 0.3 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(BookOpen, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Program Selection" }), _jsx("p", { className: "text-gray-600", children: "Choose your track and program format" })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-base font-medium mb-3 block", children: "Select Your Track *" }), _jsx(RadioGroup, { value: formData.track, onValueChange: (value) => handleInputChange("track", value), className: "grid grid-cols-1 gap-4", children: tracks.map((track) => (_jsxs(Label, { htmlFor: track.value, className: "flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-colors", children: [_jsx(RadioGroupItem, { value: track.value, id: track.value }), _jsxs("div", { className: "flex items-center space-x-2", children: [track.icon, _jsx("span", { className: "font-medium", children: track.label })] })] }, track.value))) })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-base font-medium mb-3 block", children: "Select Your Program *" }), _jsx(RadioGroup, { value: formData.program, onValueChange: (value) => handleInputChange("program", value), className: "space-y-4", children: programs.map((program) => (_jsxs(Label, { htmlFor: program.value, className: "flex items-start space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-colors", children: [_jsx(RadioGroupItem, { value: program.value, id: program.value, className: "mt-1" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "font-medium", children: program.label }), _jsx(Badge, { variant: "outline", className: "text-blue-600 border-blue-200", children: program.price })] }), _jsx("p", { className: "text-sm text-gray-600 mb-1", children: program.description }), _jsxs("div", { className: "flex items-center text-sm text-blue-600", children: [_jsx(Calendar, { className: "w-4 h-4 mr-1" }), program.duration] })] })] }, program.value))) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "motivation", children: "Why do you want to join this program? *" }), _jsx(Textarea, { id: "motivation", value: formData.motivation, onChange: (e) => handleInputChange("motivation", e.target.value), className: "mt-1", placeholder: "Tell us about your motivation and career goals...", rows: 4 })] })] }));
    const renderStep3 = () => (_jsxs(motion.div, { initial: { x: 300, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -300, opacity: 0 }, transition: { duration: 0.3 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(CheckCircle, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Additional Information" }), _jsx("p", { className: "text-gray-600", children: "Just a few more details to complete your application" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "education", children: "Highest Education Level" }), _jsxs(Select, { value: formData.education, onValueChange: (value) => handleInputChange("education", value), children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, { placeholder: "Select education level" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "high-school", children: "High School" }), _jsx(SelectItem, { value: "associate", children: "Associate Degree" }), _jsx(SelectItem, { value: "bachelor", children: "Bachelor's Degree" }), _jsx(SelectItem, { value: "master", children: "Master's Degree" }), _jsx(SelectItem, { value: "phd", children: "PhD" }), _jsx(SelectItem, { value: "other", children: "Other" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "experience", children: "Work Experience" }), _jsxs(Select, { value: formData.experience, onValueChange: (value) => handleInputChange("experience", value), children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, { placeholder: "Select experience level" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "entry", children: "Entry Level (0-2 years)" }), _jsx(SelectItem, { value: "mid", children: "Mid Level (3-5 years)" }), _jsx(SelectItem, { value: "senior", children: "Senior Level (6+ years)" }), _jsx(SelectItem, { value: "career-change", children: "Career Change" })] })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "currentRole", children: "Current Role/Industry" }), _jsxs(Select, { value: formData.currentRole, onValueChange: (value) => handleInputChange("currentRole", value), children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, { placeholder: "Select your current role or industry" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "student", children: "Student" }), _jsx(SelectItem, { value: "recent-graduate", children: "Recent Graduate" }), _jsx(SelectItem, { value: "unemployed", children: "Currently Unemployed" }), _jsx(SelectItem, { value: "entrepreneur", children: "Entrepreneur/Business Owner" }), _jsx(SelectItem, { value: "tech-developer", children: "Software Developer" }), _jsx(SelectItem, { value: "tech-other", children: "Other Tech Role" }), _jsx(SelectItem, { value: "finance", children: "Finance/Banking" }), _jsx(SelectItem, { value: "healthcare", children: "Healthcare" }), _jsx(SelectItem, { value: "education", children: "Education/Teaching" }), _jsx(SelectItem, { value: "marketing", children: "Marketing/Advertising" }), _jsx(SelectItem, { value: "sales", children: "Sales" }), _jsx(SelectItem, { value: "operations", children: "Operations/Admin" }), _jsx(SelectItem, { value: "hr", children: "Human Resources" }), _jsx(SelectItem, { value: "retail", children: "Retail/Customer Service" }), _jsx(SelectItem, { value: "consulting", children: "Consulting" }), _jsx(SelectItem, { value: "government", children: "Government/Public Service" }), _jsx(SelectItem, { value: "ngo", children: "NGO/Non-Profit" }), _jsx(SelectItem, { value: "media", children: "Media/Communications" }), _jsx(SelectItem, { value: "manufacturing", children: "Manufacturing" }), _jsx(SelectItem, { value: "oil-gas", children: "Oil & Gas" }), _jsx(SelectItem, { value: "agriculture", children: "Agriculture" }), _jsx(SelectItem, { value: "other", children: "Other Industry" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "availableHours", children: "Weekly Study Commitment" }), _jsxs(Select, { value: formData.availableHours, onValueChange: (value) => handleInputChange("availableHours", value), children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, { placeholder: "Hours per week" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "5-10", children: "5-10 hours per week" }), _jsx(SelectItem, { value: "10-15", children: "10-15 hours per week" }), _jsx(SelectItem, { value: "15-20", children: "15-20 hours per week" }), _jsx(SelectItem, { value: "20-25", children: "20-25 hours per week" }), _jsx(SelectItem, { value: "25+", children: "25+ hours per week" }), _jsx(SelectItem, { value: "flexible", children: "Flexible schedule" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "preferredStartDate", children: "Preferred Start Date" }), _jsxs(Select, { value: formData.preferredStartDate, onValueChange: (value) => handleInputChange("preferredStartDate", value), children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, { placeholder: "When would you like to start?" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "immediately", children: "Immediately" }), _jsx(SelectItem, { value: "within-2-weeks", children: "Within 2 weeks" }), _jsx(SelectItem, { value: "within-month", children: "Within a month" }), _jsx(SelectItem, { value: "next-cohort", children: "Next available cohort" }), _jsx(SelectItem, { value: "flexible", children: "Flexible timing" })] })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "referralSource", children: "How did you hear about us?" }), _jsxs(Select, { value: formData.referralSource, onValueChange: (value) => handleInputChange("referralSource", value), children: [_jsx(SelectTrigger, { className: "mt-1", children: _jsx(SelectValue, { placeholder: "Select an option" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "google", children: "Google Search" }), _jsx(SelectItem, { value: "facebook", children: "Facebook" }), _jsx(SelectItem, { value: "instagram", children: "Instagram" }), _jsx(SelectItem, { value: "twitter", children: "Twitter/X" }), _jsx(SelectItem, { value: "linkedin", children: "LinkedIn" }), _jsx(SelectItem, { value: "youtube", children: "YouTube" }), _jsx(SelectItem, { value: "whatsapp", children: "WhatsApp" }), _jsx(SelectItem, { value: "friend", children: "Friend/Family" }), _jsx(SelectItem, { value: "colleague", children: "Work Colleague" }), _jsx(SelectItem, { value: "tech-community", children: "Tech Community/Forum" }), _jsx(SelectItem, { value: "university", children: "University/School" }), _jsx(SelectItem, { value: "job-board", children: "Job Board" }), _jsx(SelectItem, { value: "podcast", children: "Podcast" }), _jsx(SelectItem, { value: "blog", children: "Blog/Article" }), _jsx(SelectItem, { value: "event", children: "Tech Event/Meetup" }), _jsx(SelectItem, { value: "advertisement", children: "Online Advertisement" }), _jsx(SelectItem, { value: "other", children: "Other" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Checkbox, { id: "hasLaptop", checked: formData.hasLaptop, onCheckedChange: (checked) => handleInputChange("hasLaptop", checked) }), _jsx(Label, { htmlFor: "hasLaptop", className: "text-sm leading-5", children: "I have access to a laptop/computer for the program" })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Checkbox, { id: "wantsUpdates", checked: formData.wantsUpdates, onCheckedChange: (checked) => handleInputChange("wantsUpdates", checked) }), _jsx(Label, { htmlFor: "wantsUpdates", className: "text-sm leading-5", children: "I'd like to receive updates about new programs and career opportunities" })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Checkbox, { id: "agreeToTerms", checked: formData.agreeToTerms, onCheckedChange: (checked) => handleInputChange("agreeToTerms", checked) }), _jsxs(Label, { htmlFor: "agreeToTerms", className: "text-sm leading-5", children: ["I agree to the ", _jsx("a", { href: "#", className: "text-blue-600 hover:underline", children: "Terms & Conditions" }), " and ", _jsx("a", { href: "#", className: "text-blue-600 hover:underline", children: "Privacy Policy" }), " *"] })] })] })] }));
    const renderStep4 = () => (_jsxs(motion.div, { initial: { x: 300, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -300, opacity: 0 }, transition: { duration: 0.3 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(CheckCircle, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Complete Your Enrollment" }), _jsx("p", { className: "text-gray-600", children: "Choose how you'd like to proceed with payment" })] }), _jsx("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4 mb-6", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "bg-green-100 p-2 rounded-full", children: _jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-green-800", children: "Application Submitted!" }), _jsxs("p", { className: "text-sm text-green-600 mt-1", children: ["Your application ID: ", _jsxs("span", { className: "font-mono font-bold", children: [submittedApplicationId?.substring(0, 8), "..."] })] })] })] }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-medium text-blue-800", children: "Program Details" }), _jsx(Badge, { variant: "outline", className: "text-blue-600 border-blue-200", children: formData.track.replace('-', ' ').toUpperCase() })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: programs.find(p => p.value === formData.program)?.label }), _jsx("p", { className: "text-xs text-gray-500", children: programs.find(p => p.value === formData.program)?.description })] }), _jsx("span", { className: "text-lg font-bold text-blue-700", children: programs.find(p => p.value === formData.program)?.price })] })] }), _jsx("div", { className: "grid grid-cols-1 gap-4", children: paymentOptions.map((option) => (_jsxs("button", { type: "button", onClick: () => handlePaymentMethodSelect(option), disabled: isProcessingPayment, className: `flex items-start space-x-4 p-4 border-2 rounded-lg text-left transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${paymentMethod === option.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'}`, children: [_jsx("div", { className: `${option.color} p-3 rounded-full`, children: option.icon }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("h4", { className: "font-semibold text-gray-900", children: option.title }), paymentMethod === option.id && (_jsx("div", { className: "w-6 h-6 bg-green-500 rounded-full flex items-center justify-center", children: _jsx(CheckCircle, { className: "w-4 h-4 text-white" }) }))] }), _jsx("p", { className: "text-sm text-gray-600", children: option.description }), option.id === "later" && (_jsx("p", { className: "text-xs text-red-600 mt-1", children: "\u26A0\uFE0F Limited spots available. Payment must be completed within 24 hours." }))] })] }, option.id))) }), paymentMethod === "paystack" && (_jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "Payment Information" }), _jsxs("ul", { className: "text-sm text-blue-600 space-y-1", children: [_jsxs("li", { className: "flex items-center", children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-2" }), "Secure SSL encrypted payment"] }), _jsxs("li", { className: "flex items-center", children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-2" }), "Multiple payment methods accepted"] }), _jsxs("li", { className: "flex items-center", children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-2" }), "Instant enrollment upon successful payment"] })] })] }))] })] }));
    const renderCurrentStep = () => {
        if (applicationSuccess) {
            return renderStep4();
        }
        switch (step) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            default: return renderStep1();
        }
    };
    const renderNavigationButtons = () => {
        if (applicationSuccess) {
            return (_jsxs("div", { className: "flex justify-between items-center mt-8 pt-6 border-t border-gray-200", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => {
                            setApplicationSuccess(false);
                            setStep(3);
                        }, className: "px-6", disabled: isProcessingPayment, children: "Back to Application" }), _jsx("div", { className: "flex items-center space-x-4", children: paymentMethod && (_jsx(Button, { type: "button", onClick: () => {
                                const option = paymentOptions.find(o => o.id === paymentMethod);
                                if (option)
                                    handlePaymentMethodSelect(option);
                            }, disabled: isProcessingPayment, className: "px-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800", children: isProcessingPayment ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-4 w-4 text-white", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Processing..."] })) : (_jsxs(_Fragment, { children: ["Proceed", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] })) })) })] }));
        }
        return (_jsxs("div", { className: "flex justify-between items-center mt-8 pt-6 border-t border-gray-200", children: [_jsx("div", { children: step > 1 && (_jsx(Button, { type: "button", variant: "outline", onClick: () => setStep(step - 1), className: "px-6", disabled: isSubmitting, children: "Previous" })) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { className: "text-sm text-gray-500", children: ["Step ", step, " of ", applicationSuccess ? 4 : 3] }), _jsx(Button, { type: "submit", disabled: isSubmitting || (step === 3 && !formData.agreeToTerms), className: `px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed ${step === 3 ? 'px-8' : ''}`, children: isSubmitting ? ("Submitting...") : step === 3 ? (_jsxs(_Fragment, { children: ["Submit Application", _jsx(CheckCircle, { className: "w-4 h-4 ml-2" })] })) : (_jsxs(_Fragment, { children: ["Continue", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] })) })] })] }));
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto mx-4", children: [_jsxs(DialogHeader, { className: "relative", children: [_jsx(DialogTitle, { className: "text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent", children: applicationSuccess ? "Complete Enrollment" : "Apply to Binarify Academy" }), _jsx(DialogDescription, { className: "text-gray-600 text-center mt-2", children: applicationSuccess
                                ? "Choose your payment method to secure your spot in the program"
                                : "Join our skills-to-jobs program and transform your career in tech. Complete this application to get started." }), _jsx("div", { className: "flex items-center justify-center space-x-2 mt-4", children: [1, 2, 3, 4].map((stepNumber) => (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${(applicationSuccess && stepNumber === 4) || (!applicationSuccess && stepNumber === step)
                                            ? "bg-blue-600 text-white"
                                            : stepNumber < step || (applicationSuccess && stepNumber < 4)
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-200 text-gray-600"} ${stepNumber === 4 && !applicationSuccess ? 'opacity-50' : ''}`, children: stepNumber < step || (applicationSuccess && stepNumber < 4) ? (_jsx(CheckCircle, { className: "w-4 h-4" })) : (stepNumber) }), stepNumber < 4 && (_jsx("div", { className: `w-12 h-1 mx-2 transition-colors ${stepNumber < step || (applicationSuccess && stepNumber < 4)
                                            ? "bg-green-500"
                                            : "bg-gray-200"}` }))] }, stepNumber))) })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(AnimatePresence, { mode: "wait", children: renderCurrentStep() }), renderNavigationButtons()] })] }) }));
}
