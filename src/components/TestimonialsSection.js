import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "./ui/card";
import { motion } from "motion/react";
export function TestimonialsSection() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Mother of 2",
            content: "Binarify Academy has transformed my career prospects completely. The structured learning path and mentorship helped me transition into tech successfully. The personalized approach really works!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e8?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Michael Chen",
            role: "Father of 3",
            content: "The interactive tools and flexible scheduling have made education fun for our entire family. Our kids actually look forward to their lessons now.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Emily Rodriguez",
            role: "Homeschool Educator",
            content: "As an educator, I'm impressed by the quality of content and the adaptive learning system. It truly meets each child where they are.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    ];
    return (_jsx(motion.section, { id: "testimonials", className: "py-12 sm:py-16 lg:py-20 bg-white", initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.6 }, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { className: "text-center mb-16", initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Listen to Parents' Feedback" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Hear from families who have transformed their children's education with our platform." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: testimonials.map((testimonial, index) => (_jsx(motion.div, { initial: { y: 100, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: {
                            duration: 0.6,
                            delay: index * 0.2,
                            ease: "easeOut"
                        }, whileHover: { y: -10, scale: 1.02 }, children: _jsxs(Card, { className: "p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50 h-full", children: [_jsxs(motion.div, { className: "flex items-center mb-6", initial: { x: -20, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.3 + index * 0.1 }, children: [_jsx(motion.img, { src: testimonial.image, alt: testimonial.name, className: "w-16 h-16 rounded-full object-cover mr-4", whileHover: { scale: 1.1 }, transition: { duration: 0.2 } }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-gray-900", children: testimonial.name }), _jsx("p", { className: "text-gray-600 text-sm", children: testimonial.role })] })] }), _jsx(motion.div, { className: "flex mb-4", initial: { scale: 0 }, whileInView: { scale: 1 }, viewport: { once: true }, transition: { delay: 0.4 + index * 0.1, type: "spring" }, children: [...Array(testimonial.rating)].map((_, i) => (_jsx(motion.svg, { className: "w-5 h-5 text-yellow-400", fill: "currentColor", viewBox: "0 0 20 20", initial: { rotate: -180, opacity: 0 }, whileInView: { rotate: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.5 + index * 0.1 + i * 0.05 }, children: _jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" }) }, i))) }), _jsxs(motion.p, { className: "text-gray-700 leading-relaxed italic", initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { delay: 0.5 + index * 0.1 }, children: ["\"", testimonial.content, "\""] })] }) }, index))) })] }) }));
}
