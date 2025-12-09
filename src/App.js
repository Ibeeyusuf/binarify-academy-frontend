import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { LearningSection } from "./components/LearningSection";
import { OutcomesSection } from "./components/PaceSection";
import { ProgramsSection } from "./components/ToolsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { PartnersSection } from "./components/StrategiesSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { ApplicationModal } from "./components/ApplicationModal";
import { useApplicationModal } from "./hooks/useApplicationModal";
import { Toaster } from "./components/ui/sonner";
import { motion } from "motion/react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import './index.css';
// Pages
import Login from "./pages/Login";
// Dashboard Layouts and Pages
import DashboardLayout from "./components/layout/DashboardLayout";
import AdminLayout from "./components/layout/AdminLayout";
import UserDashboard from "./pages/dashboard/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Applications from "./pages/dashboard/Applications";
import Payments from "./pages/dashboard/Payments";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import UserManagement from "./pages/admin/UserManagement";
import ApplicationManagement from "./pages/admin/ApplicationManagement";
import PaymentManagement from "./pages/admin/PaymentManagement";
import SystemSettings from "./pages/admin/SystemSettings";
import Analytics from "./pages/admin/Analytics";
// Landing Page Component
const LandingPage = () => {
    const applicationModal = useApplicationModal();
    return (_jsxs(motion.div, { className: "min-h-screen bg-white", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, children: [_jsx(Header, { onApplyClick: applicationModal.openModal }), _jsxs("main", { className: "pt-20", children: [_jsx(HeroSection, { onApplyClick: () => applicationModal.openModal(null) }), _jsx(ServicesSection, {}), _jsx(LearningSection, {}), _jsx(OutcomesSection, {}), _jsx(ProgramsSection, { onApplyClick: applicationModal.openModal }), _jsx(TestimonialsSection, {}), _jsx(PartnersSection, {}), _jsx(CTASection, { onApplyClick: () => applicationModal.openModal(null) })] }), _jsx(Footer, {}), _jsx(ApplicationModal, { isOpen: applicationModal.isOpen, onClose: applicationModal.closeModal, selectedTrack: applicationModal.selectedTrack, selectedProgram: applicationModal.selectedProgram }), _jsx(Toaster, {})] }));
};
export default function App() {
    return (_jsx(_Fragment, { children: _jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsxs(Route, { path: "/dashboard", element: 
                        // <ProtectedRoute>
                        _jsx(DashboardLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(UserDashboard, {}) }), _jsx(Route, { path: "applications", element: _jsx(Applications, {}) }), _jsx(Route, { path: "payments", element: _jsx(Payments, {}) }), _jsx(Route, { path: "profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "settings", element: _jsx(Settings, {}) })] }), _jsxs(Route, { path: "/admin", element: _jsx(ProtectedRoute, { allowedRoles: ['admin'], children: _jsx(AdminLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(AdminDashboard, {}) }), _jsx(Route, { path: "users", element: _jsx(UserManagement, {}) }), _jsx(Route, { path: "applications", element: _jsx(ApplicationManagement, {}) }), _jsx(Route, { path: "payments", element: _jsx(PaymentManagement, {}) }), _jsx(Route, { path: "settings", element: _jsx(SystemSettings, {}) }), _jsx(Route, { path: "analytics", element: _jsx(Analytics, {}) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }) }));
}
