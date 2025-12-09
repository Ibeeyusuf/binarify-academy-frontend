import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface HeroSectionProps {
  onApplyClick: () => void;
}

export function HeroSection({ onApplyClick }: HeroSectionProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Launch Your Global Tech Career with{" "}
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Binarify Academy
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Transform your career with our comprehensive tech training programs that bridge the gap between education and employment.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-3 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm">Expert Mentors</Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">Real-World Internship</Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">Portfolio-Ready Projects</Badge>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full text-lg"
                  onClick={onApplyClick}
                >
                  Apply Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full text-lg">
                  Join Free 3-Day Sprint
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Illustrations */}
          <motion.div 
            className="relative"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="space-y-4"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-6 transform rotate-3"
                  whileHover={{ rotate: 6, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1660810731526-0720827cbd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwd29ya3NwYWNlfGVufDF8fHx8MTc1OTAxODc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Software development workspace"
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-6 transform -rotate-2"
                  whileHover={{ rotate: -5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  style={{ animationDelay: "0.7s" }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758876202468-5ffe0ee61f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMHRvb2xzfGVufDF8fHx8MTc1ODk0NTgyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Project management tools"
                    className="w-full h-32 object-cover rounded-2xl"
                  />
                </motion.div>
              </motion.div>
              <motion.div 
                className="space-y-4 mt-8"
                initial={{ y: -50 }}
                animate={{ y: 8 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-6 transform -rotate-1"
                  whileHover={{ rotate: 2, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1618173887111-3ecfc91c41b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwbWVudG9yc2hpcCUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5MDE4NzUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Tech mentorship meeting"
                    className="w-full h-40 object-cover rounded-2xl"
                  />
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-6 transform rotate-2"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  style={{ animationDelay: "0.8s" }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1554350747-ec45fd24f51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFsaXR5JTIwYXNzdXJhbmNlJTIwdGVzdGluZ3xlbnwxfHx8fDE3NTkwMTg3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Quality assurance testing"
                    className="w-full h-36 object-cover rounded-2xl"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}