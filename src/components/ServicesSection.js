import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "./ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
export function ServicesSection() {
    const benefits = [
        {
            title: "Life Skills & Career Discovery",
            description: "2 weeks of foundational skills to communicate, collaborate, and choose your direction.",
            icon: "💡"
        },
        {
            title: "Technical Training",
            description: "6 weeks of hands-on training with industry tools, real projects, and mentor feedback.",
            icon: "⚡"
        },
        {
            title: "Mentored Internship",
            description: "4 weeks of real-world experience with professional teams (Professional track).",
            icon: "🚀"
        },
        {
            title: "Portfolio Projects & Job Support",
            description: "Graduate job-ready with a portfolio, certificate, and access to our alumni network.",
            icon: "🎯"
        }
    ];
    return (_jsx(motion.section, { className: "py-12 sm:py-16 lg:py-20 bg-gray-50", initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.6 }, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { className: "text-center mb-16", initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Why Binarify Academy" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "We bridge the gap between education and employment. Our programs combine essential life skills, practical technical training, and guided industry experience so you can land real roles and grow fast." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: benefits.map((benefit, index) => (_jsx(motion.div, { initial: { y: 80, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: {
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: "easeOut"
                        }, whileHover: { y: -5 }, children: _jsx(Card, { className: "p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx(motion.div, { className: "text-3xl flex-shrink-0", whileHover: { scale: 1.2, rotate: 10 }, transition: { duration: 0.3 }, children: benefit.icon }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: benefit.title }), _jsx("p", { className: "text-gray-600 leading-relaxed", children: benefit.description })] }), _jsx(motion.div, { className: "flex-shrink-0 text-green-500", initial: { scale: 0 }, whileInView: { scale: 1 }, transition: { delay: 0.3 + index * 0.1, duration: 0.3 }, children: _jsx(CheckCircle, { className: "w-6 h-6" }) })] }) }) }, index))) })] }) }));
}
