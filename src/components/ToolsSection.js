import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { CheckCircle, Clock, Trophy, ArrowRight, Code, Database, Bug, Settings, Briefcase } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
export function ProgramsSection({ onApplyClick }) {
    const programs = [
        {
            id: "project-management",
            title: "Project Management Track",
            subtitle: "Lead projects, drive results",
            description: "Master the art of project leadership with hands-on experience in modern PM methodologies and tools.",
            image: "https://images.unsplash.com/photo-1758876022295-00ec1f0e39f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMHRlYW0lMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc1OTAyMDExNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            tools: ["Jira", "Trello", "Asana", "Google Workspace", "Slack"],
            skills: [
                "Agile & Scrum methodologies",
                "Stakeholder communication",
                "Risk management & mitigation",
                "Budget planning & tracking",
                "Team leadership & coordination"
            ],
            outcomes: [
                "Job-ready PM portfolio",
                "Project Coordinator roles",
                "Junior Project Manager positions",
                "Scrum Master opportunities"
            ],
            icon: _jsx(Briefcase, { className: "w-8 h-8" }),
            gradient: "from-blue-500 via-blue-600 to-blue-700",
            accentColor: "blue"
        },
        {
            id: "frontend-development",
            title: "Frontend Development Track",
            subtitle: "Build beautiful, responsive interfaces",
            description: "Learn to create stunning web applications with modern JavaScript frameworks and cutting-edge UI/UX principles.",
            image: "https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm9udGVuZCUyMGRldmVsb3BtZW50JTIwY29kaW5nfGVufDF8fHx8MTc2NDg0MTQ3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            tools: ["React", "TypeScript", "Tailwind CSS", "Git", "VS Code"],
            skills: [
                "HTML5, CSS3 & JavaScript ES6+",
                "React & component-based architecture",
                "Responsive design & mobile-first approach",
                "State management & API integration",
                "Version control with Git & GitHub"
            ],
            outcomes: [
                "Professional portfolio website",
                "Frontend Developer positions",
                "UI Developer roles",
                "React Developer opportunities"
            ],
            icon: _jsx(Code, { className: "w-8 h-8" }),
            gradient: "from-purple-500 via-purple-600 to-purple-700",
            accentColor: "purple"
        },
        {
            id: "backend-development",
            title: "Backend Development Track",
            subtitle: "Power applications with robust APIs",
            description: "Master server-side development, databases, and API design to build scalable backend systems.",
            image: "https://images.unsplash.com/photo-1641156803026-0b819059b04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrZW5kJTIwc2VydmVyJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzY0ODQxNDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            tools: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker"],
            skills: [
                "RESTful API design & development",
                "Database design & management",
                "Authentication & authorization",
                "Server architecture & deployment",
                "Testing & debugging backend systems"
            ],
            outcomes: [
                "Backend project portfolio",
                "Backend Developer positions",
                "API Developer roles",
                "Full-Stack Developer opportunities"
            ],
            icon: _jsx(Database, { className: "w-8 h-8" }),
            gradient: "from-indigo-500 via-indigo-600 to-indigo-700",
            accentColor: "indigo"
        },
        {
            id: "quality-assurance",
            title: "Quality Assurance Track",
            subtitle: "Ensure excellence, prevent defects",
            description: "Become a quality champion with comprehensive testing skills and automated testing exposure.",
            image: "https://images.unsplash.com/photo-1599344941194-5eb5eaaaf73d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFsaXR5JTIwYXNzdXJhbmNlJTIwc29mdHdhcmUlMjB0ZXN0aW5nfGVufDF8fHx8MTc1OTAyMDExOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            tools: ["Postman", "JMeter", "Selenium", "Chrome DevTools", "Jira"],
            skills: [
                "Manual & automated testing",
                "API testing & validation",
                "Test case design & execution",
                "Bug tracking & reporting",
                "Performance testing basics"
            ],
            outcomes: [
                "Comprehensive QA portfolio",
                "QA Analyst positions",
                "Software Tester roles",
                "Test Engineer opportunities"
            ],
            icon: _jsx(Bug, { className: "w-8 h-8" }),
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
            accentColor: "emerald"
        },
        {
            id: "devops",
            title: "DevOps Track",
            subtitle: "Bridge development and operations",
            description: "Learn to automate deployments, manage infrastructure, and ensure smooth application delivery with DevOps practices.",
            image: "https://images.unsplash.com/photo-1718630732291-3bc8de36b030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvcHMlMjBjbG91ZCUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc2NDg0MTQ3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            tools: ["Docker", "Kubernetes", "Jenkins", "AWS", "Git"],
            skills: [
                "CI/CD pipeline setup & management",
                "Containerization with Docker",
                "Cloud infrastructure basics (AWS/Azure)",
                "Monitoring & logging",
                "Infrastructure as Code (IaC)"
            ],
            outcomes: [
                "DevOps project portfolio",
                "DevOps Engineer positions",
                "Cloud Engineer roles",
                "Site Reliability Engineer opportunities"
            ],
            icon: _jsx(Settings, { className: "w-8 h-8" }),
            gradient: "from-orange-500 via-orange-600 to-orange-700",
            accentColor: "orange"
        }
    ];
    const programOptions = [
        {
            id: "launchpad",
            name: "LaunchPad",
            duration: "8 weeks",
            price: "₦105,000",
            originalPrice: null,
            features: [
                "Core curriculum",
                "Group projects",
                "Career coaching",
                "Certificate completion"
            ],
            popular: false,
            savings: null
        },
        {
            id: "professional",
            name: "Professional",
            duration: "12 weeks",
            price: "₦205,000",
            originalPrice: "₦250,000",
            features: [
                "Everything in LaunchPad",
                "1:1 mentorship sessions",
                "4-week real internship",
                "Job placement support"
            ],
            popular: true,
            savings: "Save ₦45,000"
        }
    ];
    return (_jsxs(motion.section, { id: "programs", className: "py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden", initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.6 }, children: [_jsxs("div", { className: "absolute inset-0 opacity-5", children: [_jsx(motion.div, { className: "absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl", animate: {
                            x: [0, 50, 0],
                            y: [0, -30, 0]
                        }, transition: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        } }), _jsx(motion.div, { className: "absolute bottom-20 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl", animate: {
                            x: [0, -40, 0],
                            y: [0, 40, 0]
                        }, transition: {
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut"
                        } })] }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [_jsxs(motion.div, { className: "text-center mb-20", initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx(motion.div, { className: "inline-block", initial: { scale: 0.8, opacity: 0 }, whileInView: { scale: 1, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.2, duration: 0.6 }, children: _jsx(Badge, { className: "mb-4 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200", children: "\uD83D\uDE80 Choose Your Career Path" }) }), _jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6", children: "Programs & Tracks" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed", children: "Launch your tech career with our industry-focused training programs. Each track is designed to make you job-ready with real-world experience." })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20", children: programs.map((program, index) => (_jsx(motion.div, { initial: { y: 100, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: {
                                duration: 0.8,
                                delay: index * 0.2,
                                ease: "easeOut"
                            }, children: _jsxs(Card, { className: "group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm h-full", children: [_jsxs("div", { className: "relative overflow-hidden", children: [_jsx(motion.div, { whileHover: { scale: 1.1 }, transition: { duration: 0.6 }, children: _jsx(ImageWithFallback, { src: program.image, alt: program.title, className: "w-full h-64 object-cover" }) }), _jsx("div", { className: `absolute inset-0 bg-gradient-to-t ${program.gradient} opacity-60` }), _jsx(motion.div, { className: "absolute top-6 right-6", whileHover: { scale: 1.2, rotate: 10 }, transition: { duration: 0.3 }, children: _jsx("div", { className: "w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white", children: program.icon }) }), _jsxs("div", { className: "absolute bottom-6 left-6 right-6", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: program.title }), _jsx("p", { className: "text-white/90 text-lg", children: program.subtitle })] })] }), _jsxs("div", { className: "p-8", children: [_jsx("p", { className: "text-gray-600 mb-6 leading-relaxed", children: program.description }), _jsxs("div", { className: "mb-6", children: [_jsxs("h4", { className: "font-semibold text-gray-900 mb-3 flex items-center", children: [_jsx("div", { className: `w-2 h-2 bg-${program.accentColor}-500 rounded-full mr-3` }), "Tools & Technologies"] }), _jsx("div", { className: "flex flex-wrap gap-2", children: program.tools.map((tool, i) => (_jsx(motion.div, { whileHover: { scale: 1.05 }, transition: { duration: 0.2 }, children: _jsx(Badge, { variant: "outline", className: `border-${program.accentColor}-200 text-${program.accentColor}-700 hover:bg-${program.accentColor}-50`, children: tool }) }, i))) })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("h4", { className: "font-semibold text-gray-900 mb-3 flex items-center", children: [_jsx("div", { className: `w-2 h-2 bg-${program.accentColor}-500 rounded-full mr-3` }), "Core Skills"] }), _jsx("div", { className: "space-y-2", children: program.skills.map((skill, i) => (_jsxs(motion.div, { className: "flex items-center text-gray-600", initial: { x: -20, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.1 * i, duration: 0.4 }, children: [_jsx(CheckCircle, { className: `w-4 h-4 text-${program.accentColor}-500 mr-3 flex-shrink-0` }), _jsx("span", { className: "text-sm", children: skill })] }, i))) })] }), _jsxs("div", { className: "border-t border-gray-100 pt-6 mb-6", children: [_jsxs("h4", { className: "font-semibold text-gray-900 mb-3 flex items-center", children: [_jsx(Trophy, { className: `w-4 h-4 text-${program.accentColor}-500 mr-2` }), "Career Outcomes"] }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: program.outcomes.map((outcome, i) => (_jsx("div", { className: "text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2", children: outcome }, i))) })] }), _jsx(motion.div, { className: "mt-auto", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs(Button, { className: `w-full group text-lg py-3 bg-gradient-to-r from-${program.accentColor}-500 to-${program.accentColor}-600 hover:from-${program.accentColor}-600 hover:to-${program.accentColor}-700 text-white shadow-lg`, onClick: () => onApplyClick(program.id), children: ["Choose ", program.title, _jsx(ArrowRight, { className: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" })] }) })] })] }) }, index))) }), _jsxs(motion.div, { className: "text-center mb-12", initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h3", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Choose Your Learning Path" }), _jsx("p", { className: "text-gray-600 max-w-2xl mx-auto mb-8", children: "Both tracks are available in two formats to fit your schedule and career goals." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: programOptions.map((option, index) => (_jsx(motion.div, { initial: { y: 60, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: index * 0.2, duration: 0.6 }, children: _jsxs(Card, { className: `p-8 border-2 transition-all duration-300 relative overflow-hidden ${option.popular
                                    ? 'border-blue-500 shadow-xl bg-gradient-to-br from-blue-50 via-white to-blue-50'
                                    : 'border-gray-200 hover:border-blue-300 hover:shadow-lg bg-white'}`, children: [option.popular && (_jsxs(_Fragment, { children: [_jsx("div", { className: "absolute -top-4 left-1/2 transform -translate-x-1/2 z-10", children: _jsx(Badge, { className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 shadow-lg", children: "\uD83C\uDFC6 Most Popular" }) }), option.savings && (_jsx("div", { className: "absolute -top-2 -right-2", children: _jsx(Badge, { className: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm", children: option.savings }) }))] })), _jsxs("div", { className: "text-center mb-8 pt-4", children: [_jsx("h4", { className: "text-2xl font-bold text-gray-900 mb-2", children: option.name }), _jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx(Clock, { className: "w-5 h-5 text-blue-500 mr-2" }), _jsx("span", { className: "text-blue-600 font-semibold", children: option.duration })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [option.originalPrice && (_jsx("span", { className: "text-lg text-gray-400 line-through", children: option.originalPrice })), _jsx(motion.span, { className: `text-4xl font-bold ${option.popular ? 'text-blue-600' : 'text-gray-900'}`, whileHover: { scale: 1.05 }, transition: { duration: 0.2 }, children: option.price })] }), _jsx("p", { className: "text-gray-500 text-sm mt-1", children: "One-time payment" })] })] }), _jsx("div", { className: "space-y-4 mb-8", children: option.features.map((feature, i) => (_jsxs(motion.div, { className: "flex items-center", initial: { x: -20, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.1 * i, duration: 0.4 }, children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-500 mr-3 flex-shrink-0" }), _jsx("span", { className: "text-gray-700", children: feature })] }, i))) }), _jsx("div", { className: `mt-4 text-center text-sm ${option.popular ? 'text-blue-600' : 'text-gray-500'}`, children: option.popular
                                            ? "🎯 Best value for career transformation"
                                            : "💡 Perfect for getting started" })] }) }, index))) }), _jsxs(motion.div, { className: "text-center mt-12", initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.4 }, children: [_jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Button, { className: "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white text-xl px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group", onClick: () => onApplyClick(null, null), children: _jsxs("span", { className: "flex items-center", children: ["Apply Now - Choose Your Track", _jsx(ArrowRight, { className: "w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" })] }) }) }), _jsx("p", { className: "text-gray-600 mt-4 text-lg", children: "Select your preferred track and program during the application process" })] })] })] }));
}
