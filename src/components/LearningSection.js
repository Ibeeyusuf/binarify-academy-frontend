import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Target, Zap, Rocket, Users, BookOpen, Trophy, ArrowRight, CheckCircle, Clock } from "lucide-react";
export function LearningSection() {
    const steps = [
        {
            phase: "Phase 1",
            weeks: "Weeks 1-2",
            title: "Foundation & Career Discovery",
            subtitle: "Build essential skills and find your path",
            description: "Start with fundamental life and professional skills. Explore career paths, develop communication abilities, and learn collaborative work practices that form the foundation of your tech career.",
            image: "https://images.unsplash.com/photo-1758685848208-e108b6af94cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBkZXZlbG9wbWVudCUyMGxpZmUlMjBza2lsbHN8ZW58MXx8fHwxNzU5MDIwMzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            features: [
                "Professional communication",
                "Team collaboration",
                "Career path selection",
                "Goal setting & planning"
            ],
            icon: _jsx(Target, { className: "w-8 h-8" }),
            color: "blue",
            gradient: "from-blue-500 via-blue-600 to-blue-700"
        },
        {
            phase: "Phase 2",
            weeks: "Weeks 3-8",
            title: "Technical Mastery",
            subtitle: "Master tools and build real projects",
            description: "Dive deep into industry-standard tools and technologies. Work on hands-on projects, receive continuous feedback from expert mentors, and build a portfolio that showcases your capabilities.",
            image: "https://images.unsplash.com/photo-1621036579842-9080c7119f67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljYWwlMjB0cmFpbmluZyUyMGNvZGluZyUyMGJvb3RjYW1wfGVufDF8fHx8MTc1OTAyMDM4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            features: [
                "Industry-standard tools",
                "Real-world projects",
                "Expert mentor feedback",
                "Portfolio development"
            ],
            icon: _jsx(Zap, { className: "w-8 h-8" }),
            color: "emerald",
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700"
        },
        {
            phase: "Phase 3",
            weeks: "Weeks 9-12",
            title: "Professional Experience",
            subtitle: "Get real-world experience and mentorship",
            description: "Professional track students gain valuable internship experience with real companies. Receive personalized 1:1 mentorship, build professional references, and make the transition to full-time employment.",
            image: "https://images.unsplash.com/photo-1576092783872-50eaba4d62bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3JzaGlwJTIwaW50ZXJuc2hpcCUyMHdvcmtwbGFjZXxlbnwxfHx8fDE3NTkwMjAzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            features: [
                "Real company internship",
                "1:1 mentor sessions",
                "Professional references",
                "Job placement support"
            ],
            icon: _jsx(Rocket, { className: "w-8 h-8" }),
            color: "purple",
            gradient: "from-purple-500 via-purple-600 to-purple-700"
        }
    ];
    const outcomes = [
        {
            title: "Job-Ready Skills",
            description: "Master in-demand technical and soft skills",
            icon: _jsx(BookOpen, { className: "w-6 h-6" })
        },
        {
            title: "Professional Network",
            description: "Connect with mentors, peers, and industry professionals",
            icon: _jsx(Users, { className: "w-6 h-6" })
        },
        {
            title: "Career Success",
            description: "90% job placement rate within 3 months",
            icon: _jsx(Trophy, { className: "w-6 h-6" })
        }
    ];
    return (_jsxs(motion.section, { id: "learning", className: "py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden", initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.6 }, children: [_jsxs("div", { className: "absolute inset-0 opacity-5", children: [_jsx(motion.div, { className: "absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full blur-3xl", animate: {
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                        }, transition: {
                            duration: 30,
                            repeat: Infinity,
                            ease: "easeInOut"
                        } }), _jsx(motion.div, { className: "absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl", animate: {
                            scale: [1.2, 1, 1.2],
                            x: [0, 50, 0]
                        }, transition: {
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut"
                        } })] }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [_jsxs(motion.div, { className: "text-center mb-20", initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx(motion.div, { className: "inline-block", initial: { scale: 0.8, opacity: 0 }, whileInView: { scale: 1, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.2, duration: 0.6 }, children: _jsx(Badge, { className: "mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200", children: "\uD83D\uDCDA Your Learning Journey" }) }), _jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6", children: "How It Works" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed", children: "Our proven 3-phase approach transforms beginners into job-ready professionals through structured learning, hands-on practice, and real-world experience." })] }), _jsx("div", { className: "space-y-24", children: steps.map((step, index) => (_jsxs(motion.div, { initial: { y: 100, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-100px" }, transition: {
                                duration: 0.8,
                                delay: index * 0.2,
                                ease: "easeOut"
                            }, className: `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`, children: [_jsxs(motion.div, { className: `space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`, initial: { x: index % 2 === 1 ? 100 : -100, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.3 }, children: [_jsxs(motion.div, { className: "flex items-center space-x-4", initial: { scale: 0.8, opacity: 0 }, whileInView: { scale: 1, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.4, duration: 0.5 }, children: [_jsx("div", { className: `w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-white`, children: step.icon }), _jsxs("div", { children: [_jsx(Badge, { className: `mb-2 px-3 py-1 bg-${step.color}-100 text-${step.color}-700`, children: step.phase }), _jsxs("div", { className: "flex items-center text-gray-600", children: [_jsx(Clock, { className: "w-4 h-4 mr-2" }), _jsx("span", { className: "font-medium", children: step.weeks })] })] })] }), _jsxs("div", { children: [_jsx(motion.h3, { className: "text-3xl font-bold text-gray-900 mb-3", initial: { y: 30, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.5, duration: 0.6 }, children: step.title }), _jsx(motion.p, { className: `text-xl text-${step.color}-600 font-medium mb-4`, initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.6, duration: 0.6 }, children: step.subtitle }), _jsx(motion.p, { className: "text-gray-600 leading-relaxed text-lg", initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.7, duration: 0.6 }, children: step.description })] }), _jsx(motion.div, { className: "grid grid-cols-2 gap-4", initial: { y: 30, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.8, duration: 0.6 }, children: step.features.map((feature, i) => (_jsxs(motion.div, { className: "flex items-center space-x-3", initial: { x: -20, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.9 + i * 0.1, duration: 0.4 }, children: [_jsx(CheckCircle, { className: `w-5 h-5 text-${step.color}-500 flex-shrink-0` }), _jsx("span", { className: "text-gray-700 font-medium", children: feature })] }, i))) })] }), _jsxs(motion.div, { className: `relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`, initial: { x: index % 2 === 1 ? -100 : 100, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.4 }, children: [_jsx(Card, { className: "overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-sm", children: _jsxs(motion.div, { whileHover: { scale: 1.05 }, transition: { duration: 0.6 }, className: "relative overflow-hidden", children: [_jsx(ImageWithFallback, { src: step.image, alt: step.title, className: "w-full h-80 object-cover" }), _jsx("div", { className: `absolute inset-0 bg-gradient-to-t ${step.gradient} opacity-20` })] }) }), _jsx(motion.div, { className: `absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white shadow-xl`, initial: { scale: 0, rotate: -180 }, whileInView: { scale: 1, rotate: 0 }, viewport: { once: true }, transition: { delay: 0.8, duration: 0.6, type: "spring" }, whileHover: { scale: 1.1, rotate: 10 }, children: _jsx("span", { className: "text-xl font-bold", children: index + 1 }) })] }), index < steps.length - 1 && (_jsx(motion.div, { className: "hidden lg:block absolute -bottom-12 left-1/2 transform -translate-x-1/2", initial: { opacity: 0, y: -20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: 1.2, duration: 0.6 }, children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(ArrowRight, { className: "w-8 h-8 text-gray-400 rotate-90" }), _jsx("div", { className: "w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent" })] }) }))] }, index))) }), _jsxs(motion.div, { className: "mt-32 text-center", initial: { y: 80, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8 }, children: [_jsx("h3", { className: "text-3xl font-bold text-gray-900 mb-4", children: "What You'll Achieve" }), _jsx("p", { className: "text-gray-600 mb-12 max-w-2xl mx-auto", children: "Our comprehensive approach ensures you're not just learning, but transforming into a confident professional." }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: outcomes.map((outcome, index) => (_jsx(motion.div, { initial: { y: 60, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: index * 0.2, duration: 0.6 }, children: _jsxs(Card, { className: "p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm text-center", children: [_jsx(motion.div, { className: "w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6", whileHover: { scale: 1.1, rotate: 5 }, transition: { duration: 0.3 }, children: _jsx("div", { className: "text-blue-600", children: outcome.icon }) }), _jsx("h4", { className: "text-xl font-bold text-gray-900 mb-3", children: outcome.title }), _jsx("p", { className: "text-gray-600", children: outcome.description })] }) }, index))) })] })] })] }));
}
