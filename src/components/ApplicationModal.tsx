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
import { X, CheckCircle, Calendar, User, Mail, Phone, BookOpen, Target, ArrowRight, Code, Database, Bug, Settings, Briefcase, CreditCard, Clock, LogIn, Percent, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { applicationService, SubmitApplicationRequest } from "../services/api";
import paymentService from "../services/api/paymentService";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrack: "project-management" | "quality-assurance" | null;
  selectedProgram: "launchpad" | "professional" | null;
}

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  state: string;
  password: string;
  confirmPassword: string;
  
  // Program Selection
  track: string;
  program: string;
  
  // Background
  education: string;
  experience: string;
  currentRole: string;
  motivation: string;
  goals: string;
  
  // Additional
  preferredStartDate: string;
  availableHours: string;
  referralSource: string;
  hasLaptop: boolean;
  agreeToTerms: boolean;
  wantsUpdates: boolean;
}

interface PaymentOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: "paystack" | "login" | "later" | "whatsapp";
  percentage?: number;
}

export function ApplicationModal({ isOpen, onClose, selectedTrack, selectedProgram }: ApplicationModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [submittedApplicationId, setSubmittedApplicationId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
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

  // WhatsApp phone number for staff communication
  const whatsappPhoneNumber = "2348123456789";

  const tracks = [
    { value: "project-management", label: "Project Management", icon: <Briefcase className="w-4 h-4" /> },
    { value: "frontend-development", label: "Frontend Development", icon: <Code className="w-4 h-4" /> },
    { value: "backend-development", label: "Backend Development", icon: <Database className="w-4 h-4" /> },
    { value: "quality-assurance", label: "Quality Assurance", icon: <Bug className="w-4 h-4" /> },
    { value: "devops", label: "DevOps", icon: <Settings className="w-4 h-4" /> }
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

  const statesByCountry: Record<string, { value: string; label: string }[]> = {
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

  const paymentOptions: PaymentOption[] = [
    {
      id: "paystack-full",
      title: "Pay Now",
      description: "Secure payment via Paystack. Complete your enrollment instantly.",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      action: "paystack"
    },
    {
      id: "whatsapp-partial",
      title: "Pay 60% Now",
      description: "Pay 60% to secure your spot. Chat with our staff on WhatsApp for payment arrangement.",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      action: "whatsapp",
      percentage: 60
    },
    {
      id: "login",
      title: "Login & Pay Later",
      description: "Already have an account? Login to access your dashboard.",
      icon: <LogIn className="w-6 h-6" />,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      action: "login"
    },
    {
      id: "later",
      title: "Pay Later",
      description: "Submit application now, pay within 24 hours to secure your spot.",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      action: "later"
    }
  ];

  const getStatesForCountry = (country: string) => {
    return statesByCountry[country] || [];
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    if (field === "country") {
      setFormData(prev => ({ ...prev, [field]: value, state: "" }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        const submissionData: SubmitApplicationRequest = {
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
          setSubmittedApplicationId(response.data.applicationId || response.data.id);
          setApplicationSuccess(true);
          toast.success("Application submitted successfully!");
        } else {
          if (response.errors && response.errors.length > 0) {
            const errorMessages = response.errors
              .map(err => `${err.field}: ${err.message}`)
              .join(', ');
            toast.error(`Validation errors: ${errorMessages}`);
          } else {
            toast.error(response.message || "Failed to submit application");
          }
        }
      } catch (error: any) {
        console.error('Submission error:', error);
        
        if (error.response?.data?.errors) {
          const errorMessages = error.response.data.errors
            .map((err: any) => `${err.field}: ${err.message}`)
            .join(', ');
          toast.error(`Validation errors: ${errorMessages}`);
        } else {
          toast.error("Failed to submit application. Please check your connection and try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getProgramPrice = (program: string) => {
    const programInfo = programs.find(p => p.value === program);
    if (!programInfo) return 0;
    
    const priceString = programInfo.price.replace(/[^0-9]/g, '');
    return parseInt(priceString) || 0;
  };

  const handlePaymentMethodSelect = async (method: PaymentOption) => {
    setPaymentMethod(method.id);
    
    switch (method.action) {
      case "paystack":
        await handlePaystackPayment();
        break;
      case "whatsapp":
        handleWhatsAppRedirect();
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
        window.location.href = paymentResponse.data.authorization_url;
      } else {
        toast.error(paymentResponse.message || "Payment initialization failed");
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || "Failed to initialize payment");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const fullAmount = getProgramPrice(formData.program);
    const partialAmount = fullAmount * 0.6;
    
    const message = `Hello Binarify Academy Team!

I've just submitted my application and I'm interested in the 60% payment option.

Application Details:
• Name: ${formData.firstName} ${formData.lastName}
• Email: ${formData.email}
• Phone: ${formData.countryCode} ${formData.phone}
• Program: ${formData.program === 'launchpad' ? 'LaunchPad Track' : 'Professional Track'}
• Track: ${formData.track.replace('-', ' ').toUpperCase()}
• Application ID: ${submittedApplicationId}
• Total Amount: ₦${fullAmount.toLocaleString()}
• 60% Payment Amount: ₦${partialAmount.toLocaleString()}

Please send me the payment link for the 60% payment.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success("Opening WhatsApp to connect with our team...");
    
    setTimeout(() => {
      onClose();
      resetForm();
    }, 2000);
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

  const renderStep1 = () => (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="text-center mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Personal Information</h3>
        <p className="text-sm sm:text-base text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            className="h-11 text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            className="h-11 text-base"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter your email address"
          className="h-11 text-base"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="countryCode" className="text-sm font-medium">Country Code *</Label>
          <Select value={formData.countryCode} onValueChange={(value) => handleInputChange("countryCode", value)}>
            <SelectTrigger className="h-11 text-base">
              <SelectValue placeholder="Select code" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {countryCodes.map((code) => (
                <SelectItem key={code.value} value={code.value} className="text-base">
                  {code.flag} {code.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            className="h-11 text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium">Country *</Label>
          <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
            <SelectTrigger className="h-11 text-base">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value} className="text-base">
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state" className="text-sm font-medium">State/Region *</Label>
          <Select 
            value={formData.state} 
            onValueChange={(value) => handleInputChange("state", value)}
            disabled={!formData.country}
          >
            <SelectTrigger className="h-11 text-base">
              <SelectValue placeholder={formData.country ? "Select state/region" : "Select country first"} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {getStatesForCountry(formData.country).map((state) => (
                <SelectItem key={state.value} value={state.value} className="text-base">
                  {state.label}
                </SelectItem>
              ))}
              {formData.country && getStatesForCountry(formData.country).length === 0 && (
                <SelectItem value="not-specified" className="text-base">Region not specified</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Create Login Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Enter your password"
            className="h-11 text-base"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum 8 characters with letters and numbers
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            placeholder="Re-enter your password"
            className="h-11 text-base"
            required
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="text-center mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Program Selection</h3>
        <p className="text-sm sm:text-base text-gray-600">Choose your track and program format</p>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block">Select Your Track *</Label>
        <RadioGroup 
          value={formData.track} 
          onValueChange={(value) => handleInputChange("track", value)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {tracks.map((track) => (
            <Label
              key={track.value}
              htmlFor={track.value}
              className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-colors"
            >
              <RadioGroupItem value={track.value} id={track.value} />
              <div className="flex items-center space-x-2">
                {track.icon}
                <span className="font-medium text-sm">{track.label}</span>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block">Select Your Program *</Label>
        <RadioGroup 
          value={formData.program} 
          onValueChange={(value) => handleInputChange("program", value)}
          className="space-y-3"
        >
          {programs.map((program) => (
            <Label
              key={program.value}
              htmlFor={program.value}
              className="flex items-start space-x-3 border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-colors"
            >
              <RadioGroupItem value={program.value} id={program.value} className="mt-1" />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                  <span className="font-medium text-sm">{program.label}</span>
                  <Badge variant="outline" className="text-blue-600 border-blue-200 text-xs">
                    {program.price}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-1">{program.description}</p>
                <div className="flex items-center text-xs text-blue-600">
                  <Calendar className="w-3 h-3 mr-1" />
                  {program.duration}
                </div>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation" className="text-sm font-medium">Why do you want to join this program? *</Label>
        <Textarea
          id="motivation"
          value={formData.motivation}
          onChange={(e) => handleInputChange("motivation", e.target.value)}
          placeholder="Should not be less than 50 characters"
          rows={4}
          className="text-base"
        />
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="text-center mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Additional Information</h3>
        <p className="text-sm sm:text-base text-gray-600">Just a few more details to complete your application</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="education" className="text-sm font-medium">Highest Education Level</Label>
          <Select value={formData.education} onValueChange={(value) => handleInputChange("education", value)}>
            <SelectTrigger className="h-11 text-base">
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="high-school" className="text-base">High School</SelectItem>
              <SelectItem value="associate" className="text-base">Associate Degree</SelectItem>
              <SelectItem value="bachelor" className="text-base">Bachelor's Degree</SelectItem>
              <SelectItem value="master" className="text-base">Master's Degree</SelectItem>
              <SelectItem value="phd" className="text-base">PhD</SelectItem>
              <SelectItem value="other" className="text-base">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience" className="text-sm font-medium">Work Experience</Label>
          <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
            <SelectTrigger className="h-11 text-base">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="entry" className="text-base">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="mid" className="text-base">Mid Level (3-5 years)</SelectItem>
              <SelectItem value="senior" className="text-base">Senior Level (6+ years)</SelectItem>
              <SelectItem value="career-change" className="text-base">Career Change</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentRole" className="text-sm font-medium">Current Role/Industry</Label>
        <Select value={formData.currentRole} onValueChange={(value) => handleInputChange("currentRole", value)}>
          <SelectTrigger className="h-11 text-base">
            <SelectValue placeholder="Select your current role or industry" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <SelectItem value="student" className="text-base">Student</SelectItem>
            <SelectItem value="recent-graduate" className="text-base">Recent Graduate</SelectItem>
            <SelectItem value="unemployed" className="text-base">Currently Unemployed</SelectItem>
            <SelectItem value="entrepreneur" className="text-base">Entrepreneur/Business Owner</SelectItem>
            <SelectItem value="tech-developer" className="text-base">Software Developer</SelectItem>
            <SelectItem value="tech-other" className="text-base">Other Tech Role</SelectItem>
            <SelectItem value="finance" className="text-base">Finance/Banking</SelectItem>
            <SelectItem value="healthcare" className="text-base">Healthcare</SelectItem>
            <SelectItem value="education" className="text-base">Education/Teaching</SelectItem>
            <SelectItem value="marketing" className="text-base">Marketing/Advertising</SelectItem>
            <SelectItem value="sales" className="text-base">Sales</SelectItem>
            <SelectItem value="operations" className="text-base">Operations/Admin</SelectItem>
            <SelectItem value="hr" className="text-base">Human Resources</SelectItem>
            <SelectItem value="retail" className="text-base">Retail/Customer Service</SelectItem>
            <SelectItem value="consulting" className="text-base">Consulting</SelectItem>
            <SelectItem value="government" className="text-base">Government/Public Service</SelectItem>
            <SelectItem value="ngo" className="text-base">NGO/Non-Profit</SelectItem>
            <SelectItem value="media" className="text-base">Media/Communications</SelectItem>
            <SelectItem value="manufacturing" className="text-base">Manufacturing</SelectItem>
            <SelectItem value="oil-gas" className="text-base">Oil & Gas</SelectItem>
            <SelectItem value="agriculture" className="text-base">Agriculture</SelectItem>
            <SelectItem value="other" className="text-base">Other Industry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="availableHours" className="text-sm font-medium">Weekly Study Commitment</Label>
          <Select value={formData.availableHours} onValueChange={(value) => handleInputChange("availableHours", value)}>
            <SelectTrigger className="h-11 text-base">
              <SelectValue placeholder="Hours per week" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="5-10" className="text-base">5-10 hours per week</SelectItem>
              <SelectItem value="10-15" className="text-base">10-15 hours per week</SelectItem>
              <SelectItem value="15-20" className="text-base">15-20 hours per week</SelectItem>
              <SelectItem value="20-25" className="text-base">20-25 hours per week</SelectItem>
              <SelectItem value="25+" className="text-base">25+ hours per week</SelectItem>
              <SelectItem value="flexible" className="text-base">Flexible schedule</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredStartDate" className="text-sm font-medium">Preferred Start Date</Label>
          <Select value={formData.preferredStartDate} onValueChange={(value) => handleInputChange("preferredStartDate", value)}>
            <SelectTrigger className="h-11 text-base">
              <SelectValue placeholder="When would you like to start?" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="immediately" className="text-base">Immediately</SelectItem>
              <SelectItem value="within-2-weeks" className="text-base">Within 2 weeks</SelectItem>
              <SelectItem value="within-month" className="text-base">Within a month</SelectItem>
              <SelectItem value="next-cohort" className="text-base">Next available cohort</SelectItem>
              <SelectItem value="flexible" className="text-base">Flexible timing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="referralSource" className="text-sm font-medium">How did you hear about us?</Label>
        <Select value={formData.referralSource} onValueChange={(value) => handleInputChange("referralSource", value)}>
          <SelectTrigger className="h-11 text-base">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <SelectItem value="google" className="text-base">Google Search</SelectItem>
            <SelectItem value="facebook" className="text-base">Facebook</SelectItem>
            <SelectItem value="instagram" className="text-base">Instagram</SelectItem>
            <SelectItem value="twitter" className="text-base">Twitter/X</SelectItem>
            <SelectItem value="linkedin" className="text-base">LinkedIn</SelectItem>
            <SelectItem value="youtube" className="text-base">YouTube</SelectItem>
            <SelectItem value="whatsapp" className="text-base">WhatsApp</SelectItem>
            <SelectItem value="friend" className="text-base">Friend/Family</SelectItem>
            <SelectItem value="colleague" className="text-base">Work Colleague</SelectItem>
            <SelectItem value="tech-community" className="text-base">Tech Community/Forum</SelectItem>
            <SelectItem value="university" className="text-base">University/School</SelectItem>
            <SelectItem value="job-board" className="text-base">Job Board</SelectItem>
            <SelectItem value="podcast" className="text-base">Podcast</SelectItem>
            <SelectItem value="blog" className="text-base">Blog/Article</SelectItem>
            <SelectItem value="event" className="text-base">Tech Event/Meetup</SelectItem>
            <SelectItem value="advertisement" className="text-base">Online Advertisement</SelectItem>
            <SelectItem value="other" className="text-base">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="hasLaptop"
            checked={formData.hasLaptop}
            onCheckedChange={(checked) => handleInputChange("hasLaptop", checked)}
          />
          <Label htmlFor="hasLaptop" className="text-sm leading-5">
            I have access to a laptop/computer for the program
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="wantsUpdates"
            checked={formData.wantsUpdates}
            onCheckedChange={(checked) => handleInputChange("wantsUpdates", checked)}
          />
          <Label htmlFor="wantsUpdates" className="text-sm leading-5">
            I'd like to receive updates about new programs and career opportunities
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
          />
          <Label htmlFor="agreeToTerms" className="text-sm leading-5">
            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
          </Label>
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => {
    const fullAmount = getProgramPrice(formData.program);
    const selectedPayment = paymentOptions.find(opt => opt.id === paymentMethod);
    const isWhatsApp = selectedPayment?.action === 'whatsapp';
    const partialAmount = fullAmount * 0.6;
    const remainingAmount = fullAmount * 0.4;

    return (
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 sm:space-y-6"
      >
        <div className="text-center mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Complete Your Enrollment</h3>
          <p className="text-sm sm:text-base text-gray-600">Choose how you'd like to proceed with payment</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-green-800 text-sm">Application Submitted!</h4>
              <p className="text-xs text-green-600 mt-1">
                Your application ID: <span className="font-mono font-bold">{submittedApplicationId?.substring(0, 8)}...</span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
              <span className="font-medium text-blue-800 text-sm">Program Details</span>
              <Badge variant="outline" className="text-blue-600 border-blue-200 text-xs">
                {formData.track.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {formData.program === 'professional' ? 'Professional Track' : 'LaunchPad Track'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formData.program === 'professional' 
                      ? 'Advanced training with internship' 
                      : 'Essential skills for career entry'}
                  </p>
                </div>
                <span className="text-lg font-bold text-blue-700">
                  ₦{fullAmount.toLocaleString()}
                </span>
              </div>
              
              {isWhatsApp && (
                <div className="mt-3 pt-3 border-t border-blue-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Initial Payment (60%):</span>
                    <span className="font-semibold text-green-600">₦{partialAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Remaining Balance (40%):</span>
                    <span className="font-semibold text-orange-600">₦{remainingAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {paymentOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handlePaymentMethodSelect(option)}
                disabled={isProcessingPayment}
                className={`flex items-start space-x-4 p-4 border-2 rounded-lg text-left transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
                  paymentMethod === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className={`${option.color} p-3 rounded-full`}>
                  <div className="w-6 h-6">
                    {option.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{option.title}</h4>
                    {paymentMethod === option.id && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{option.description}</p>
                  {option.id === "whatsapp-partial" && (
                    <div className="mt-2 flex items-center text-xs text-green-600">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      <span>Chat with our team to arrange payment</span>
                    </div>
                  )}
                  {option.id === "later" && (
                    <p className="text-xs text-red-600 mt-1">
                      ⚠️ Limited spots available. Payment must be completed within 24 hours.
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {paymentMethod && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 text-sm mb-2">
                {paymentMethod === 'whatsapp-partial' ? 'WhatsApp Payment Process' : 'Payment Information'}
              </h4>
              <ul className="text-xs text-blue-600 space-y-1">
                {paymentMethod === 'whatsapp-partial' ? (
                  <>
                    <li className="flex items-start">
                      <MessageCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5" />
                      You'll be redirected to WhatsApp to chat with our admissions team
                    </li>
                    <li className="flex items-start">
                      <MessageCircle className="w-4 h-4 mr-2 text-blue-600 mt-0.5" />
                      Discuss payment options and get personalized assistance
                    </li>
                    <li className="flex items-start">
                      <CreditCard className="w-4 h-4 mr-2 text-purple-600 mt-0.5" />
                      Receive secure payment link directly from our staff
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Secure SSL encrypted payment
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Multiple payment methods accepted
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Instant enrollment upon successful payment
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

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
      return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setApplicationSuccess(false);
              setStep(3);
            }}
            className="px-6 w-full sm:w-auto"
            disabled={isProcessingPayment}
          >
            Back to Application
          </Button>
          
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            {paymentMethod && (
              <Button
                type="button"
                onClick={() => {
                  const option = paymentOptions.find(o => o.id === paymentMethod);
                  if (option) handlePaymentMethodSelect(option);
                }}
                disabled={isProcessingPayment}
                className={`px-8 w-full sm:w-auto ${
                  paymentMethod === 'whatsapp-partial'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                    : 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800'
                }`}
              >
                {isProcessingPayment ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : paymentMethod === 'whatsapp-partial' ? (
                  <>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </>
                ) : (
                  <>
                    Proceed
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-gray-200">
        <div>
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="px-6 w-full sm:w-auto"
              disabled={isSubmitting}
            >
              Previous
            </Button>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <span className="text-xs text-gray-500">
            Step {step} of {applicationSuccess ? 4 : 3}
          </span>
          <Button
            type="submit"
            disabled={isSubmitting || (step === 3 && !formData.agreeToTerms)}
            className={`px-6 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed ${
              step === 3 ? 'sm:px-8' : ''
            }`}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : step === 3 ? (
              <>
                Submit Application
                <CheckCircle className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* FIXED: Responsive DialogContent with proper mobile handling */}
      <DialogContent className="fixed left-0 top-0 w-full h-full sm:left-1/2 sm:top-1/2 sm:w-[95%] sm:max-w-2xl sm:h-auto sm:max-h-[90vh] sm:-translate-x-1/2 sm:-translate-y-1/2 p-0 sm:p-6 overflow-hidden border-0 sm:border rounded-lg">
        {/* Mobile header */}
        <div className="sticky top-0 bg-white border-b z-50 p-4 flex items-center justify-between sm:hidden">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {applicationSuccess ? "Complete Enrollment" : "Apply Now"}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Step {step} of {applicationSuccess ? 4 : 3}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
            disabled={isSubmitting || isProcessingPayment}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Desktop header */}
        <DialogHeader className="hidden sm:block relative pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-0 top-0 h-8 w-8 p-0"
            disabled={isSubmitting || isProcessingPayment}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {applicationSuccess ? "Complete Enrollment" : "Apply to Binarify Academy"}
          </DialogTitle>
          
          <DialogDescription className="text-gray-600 text-center mt-2 text-sm sm:text-base">
            {applicationSuccess 
              ? "Choose your payment method to secure your spot in the program"
              : "Join our skills-to-jobs program and transform your career in tech."}
          </DialogDescription>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    (applicationSuccess && stepNumber === 4) || (!applicationSuccess && stepNumber === step)
                      ? "bg-blue-600 text-white"
                      : stepNumber < step || (applicationSuccess && stepNumber < 4)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } ${stepNumber === 4 && !applicationSuccess ? 'opacity-50' : ''}`}
                >
                  {stepNumber < step || (applicationSuccess && stepNumber < 4) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-12 h-1 mx-2 transition-colors ${
                      stepNumber < step || (applicationSuccess && stepNumber < 4)
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        {/* Scrollable form content */}
        <div className="h-[calc(100vh-4rem)] sm:h-auto sm:max-h-[calc(90vh-8rem)] overflow-y-auto p-4 sm:p-0 sm:pr-1">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <div className="min-h-[60vh] sm:min-h-0">
                {renderCurrentStep()}
              </div>
            </AnimatePresence>

            {/* Navigation buttons - sticky on mobile */}
            <div className="sticky bottom-0 bg-white border-t pt-4 pb-2 mt-6 sm:static sm:border-t-0 sm:pt-6 sm:mt-8">
              {renderNavigationButtons()}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}