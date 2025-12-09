import { Button } from "./ui/button";
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
      icon: <Target className="w-8 h-8" />,
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
      icon: <Zap className="w-8 h-8" />,
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
      icon: <Rocket className="w-8 h-8" />,
      color: "purple",
      gradient: "from-purple-500 via-purple-600 to-purple-700"
    }
  ];

  const outcomes = [
    {
      title: "Job-Ready Skills",
      description: "Master in-demand technical and soft skills",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Professional Network",
      description: "Connect with mentors, peers, and industry professionals",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Career Success",
      description: "90% job placement rate within 3 months",
      icon: <Trophy className="w-6 h-6" />
    }
  ];

  return (
    <motion.section 
      id="learning"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, 50, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Badge className="mb-4 px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
              📚 Your Learning Journey
            </Badge>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our proven 3-phase approach transforms beginners into job-ready professionals 
            through structured learning, hands-on practice, and real-world experience.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <motion.div 
                className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                initial={{ x: index % 2 === 1 ? 100 : -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Phase Badge */}
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-white`}>
                    {step.icon}
                  </div>
                  <div>
                    <Badge className={`mb-2 px-3 py-1 bg-${step.color}-100 text-${step.color}-700`}>
                      {step.phase}
                    </Badge>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-medium">{step.weeks}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Title & Description */}
                <div>
                  <motion.h3 
                    className="text-3xl font-bold text-gray-900 mb-3"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className={`text-xl text-${step.color}-600 font-medium mb-4`}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    {step.subtitle}
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 leading-relaxed text-lg"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    {step.description}
                  </motion.p>
                </div>

                {/* Features List */}
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  {step.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-3"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                    >
                      <CheckCircle className={`w-5 h-5 text-${step.color}-500 flex-shrink-0`} />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div 
                className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                initial={{ x: index % 2 === 1 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden"
                  >
                    <ImageWithFallback
                      src={step.image}
                      alt={step.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${step.gradient} opacity-20`} />
                  </motion.div>
                </Card>

                {/* Floating Number */}
                <motion.div 
                  className={`absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white shadow-xl`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <span className="text-xl font-bold">{index + 1}</span>
                </motion.div>
              </motion.div>

              {/* Connector Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className="flex flex-col items-center">
                    <ArrowRight className="w-8 h-8 text-gray-400 rotate-90" />
                    <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Outcomes Section */}
        <motion.div 
          className="mt-32 text-center"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            What You'll Achieve
          </h3>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Our comprehensive approach ensures you're not just learning, but transforming into a confident professional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm text-center">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-blue-600">
                      {outcome.icon}
                    </div>
                  </motion.div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {outcome.title}
                  </h4>
                  <p className="text-gray-600">
                    {outcome.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}