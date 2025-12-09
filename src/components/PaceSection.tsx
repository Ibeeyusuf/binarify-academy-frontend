import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function OutcomesSection() {
  const outcomes = [
    "Portfolio of real projects",
    "Certificate of completion", 
    "Access to alumni community",
    "Job alerts and opportunities"
  ];

  const roles = [
    "Project Coordinator",
    "QA Analyst", 
    "Product Assistant",
    "Junior PM/QA"
  ];

  return (
    <motion.section 
      id="outcomes"
      className="py-12 sm:py-16 lg:py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Outcomes & Careers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Graduate with everything you need to start your tech career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - What You Get */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">What You'll Graduate With:</h3>
              <div className="space-y-4">
                {outcomes.map((outcome, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div 
                      className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <div>
                      <p className="text-gray-700 font-medium">{outcome}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Career Opportunities */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Typical Career Roles:</h3>
              <div className="grid grid-cols-2 gap-4">
                {roles.map((role, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-4 text-center shadow-sm"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="font-medium text-gray-800">{role}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-8 p-6 bg-white rounded-2xl shadow-sm"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <blockquote className="text-gray-700 italic mb-4">
                  "Binarify gave me structure, mentorship, and a portfolio that got me interviews."
                </blockquote>
                <cite className="text-sm text-gray-600 font-medium">— Alumni, QA Analyst</cite>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}