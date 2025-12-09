import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
export function CTASection({ onApplyClick }) {
    return (_jsxs(motion.section, { className: "py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden", initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.8 }, children: [_jsxs("div", { className: "absolute inset-0 opacity-10", children: [_jsx(motion.div, { className: "absolute top-10 left-10 w-32 h-32 bg-white rounded-full", animate: {
                            x: [0, 20, 0],
                            y: [0, -10, 0],
                            scale: [1, 1.1, 1]
                        }, transition: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        } }), _jsx(motion.div, { className: "absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full", animate: {
                            x: [0, -15, 0],
                            y: [0, 15, 0],
                            scale: [1, 0.9, 1]
                        }, transition: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        } }), _jsx(motion.div, { className: "absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full", animate: {
                            rotate: 360,
                            scale: [1, 1.2, 1]
                        }, transition: {
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        } })] }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [_jsxs(motion.div, { className: "text-white space-y-8", initial: { x: -100, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8 }, children: [_jsx(motion.h2, { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight", initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.2, duration: 0.6 }, children: "Ready to Transform Your Career?" }), _jsx(motion.p, { className: "text-xl text-blue-100 leading-relaxed", initial: { y: 30, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.4, duration: 0.6 }, children: "Join thousands of successful graduates who have launched their tech careers through Binarify Academy. Start your journey today and become job-ready in just 8-12 weeks." }), _jsxs(motion.div, { className: "flex flex-col sm:flex-row gap-4", initial: { y: 40, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.6, duration: 0.6 }, children: [_jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Button, { className: "bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold", onClick: onApplyClick, children: "Apply Now" }) }), _jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } })] }), _jsx(motion.div, { className: "flex items-center space-x-8 pt-4", initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.8, duration: 0.6 }, children: [
                                        { number: "500+", label: "Graduates Hired" },
                                        { number: "90%", label: "Job Placement Rate" },
                                        { number: "95%", label: "Success Rate" }
                                    ].map((stat, index) => (_jsxs(motion.div, { className: "text-center", initial: { scale: 0, opacity: 0 }, whileInView: { scale: 1, opacity: 1 }, viewport: { once: true }, transition: { delay: 1 + index * 0.2, duration: 0.5, type: "spring" }, whileHover: { scale: 1.1 }, children: [_jsx("div", { className: "text-3xl font-bold", children: stat.number }), _jsx("div", { className: "text-blue-200", children: stat.label })] }, index))) })] }), _jsxs(motion.div, { className: "relative", initial: { x: 100, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.3 }, children: [_jsx(motion.div, { className: "bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform rotate-3", whileHover: { rotate: 5, scale: 1.02 }, transition: { duration: 0.3 }, children: _jsx(ImageWithFallback, { src: "https://images.unsplash.com/photo-1758270705087-76e81a5117bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NTkwMTc5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "Diverse students studying together", className: "w-full h-80 object-cover rounded-2xl shadow-2xl" }) }), _jsx(motion.div, { className: "absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg transform -rotate-6", initial: { scale: 0, rotate: -180 }, whileInView: { scale: 1, rotate: -6 }, viewport: { once: true }, transition: { delay: 0.8, duration: 0.6, type: "spring" }, whileHover: { rotate: -10, scale: 1.1 }, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(motion.div, { className: "w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center", animate: { rotate: 360 }, transition: { duration: 2, repeat: Infinity, ease: "linear" }, children: _jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), _jsx("span", { className: "text-sm font-semibold text-gray-700", children: "Join Today!" })] }) })] })] }) })] }));
}
