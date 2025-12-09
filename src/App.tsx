import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header onApplyClick={applicationModal.openModal} />
      <main className="pt-20">
        <HeroSection onApplyClick={() => applicationModal.openModal(null)} />
        <ServicesSection />
        <LearningSection />
        <OutcomesSection />
        <ProgramsSection onApplyClick={applicationModal.openModal} />
        <TestimonialsSection />
        <PartnersSection />
        <CTASection onApplyClick={() => applicationModal.openModal(null)} />
      </main>
      <Footer />

      <ApplicationModal
        isOpen={applicationModal.isOpen}
        onClose={applicationModal.closeModal}
        selectedTrack={applicationModal.selectedTrack}
        selectedProgram={applicationModal.selectedProgram}
      />

      <Toaster />
    </motion.div>
  );
};

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="payment-verify" element={<VerifyPayment />} /> */}
          
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={
            // <ProtectedRoute>
              <DashboardLayout />
            // </ProtectedRoute>
          }>
            <Route index element={<UserDashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="payments" element={<Payments />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="applications" element={<ApplicationManagement />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </>
  );
}