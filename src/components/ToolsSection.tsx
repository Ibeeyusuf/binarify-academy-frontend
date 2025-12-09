import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { Calendar, Users, Target, CheckCircle, Clock, Trophy, ArrowRight, Code, Database, Bug, Settings, Briefcase } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProgramsSectionProps {
  onApplyClick: (track: "project-management" | "quality-assurance" | null, program?: "launchpad" | "professional") => void;
}

export function ProgramsSection({ onApplyClick }: ProgramsSectionProps) {
  const programs = [
    {
      id: "project-management" as const,
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
      icon: <Briefcase className="w-8 h-8" />,
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      accentColor: "blue"
    },
    {
      id: "frontend-development" as const,
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
      icon: <Code className="w-8 h-8" />,
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      accentColor: "purple"
    },
    {
      id: "backend-development" as const,
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
      icon: <Database className="w-8 h-8" />,
      gradient: "from-indigo-500 via-indigo-600 to-indigo-700",
      accentColor: "indigo"
    },
    {
      id: "quality-assurance" as const,
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
      icon: <Bug className="w-8 h-8" />,
      gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
      accentColor: "emerald"
    },
    {
      id: "devops" as const,
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
      icon: <Settings className="w-8 h-8" />,
      gradient: "from-orange-500 via-orange-600 to-orange-700",
      accentColor: "orange"
    }
  ];

  const programOptions = [
    {
      id: "launchpad" as const,
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
      id: "professional" as const,
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

  return (
    <motion.section 
      id="programs"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0]
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
            <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
              🚀 Choose Your Career Path
            </Badge>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Programs & Tracks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Launch your tech career with our industry-focused training programs. 
            Each track is designed to make you job-ready with real-world experience.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
            >
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm h-full">
                {/* Image Header */}
                <div className="relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src={program.image}
                      alt={program.title}
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient} opacity-60`} />
                  
                  {/* Floating Icon */}
                  <motion.div 
                    className="absolute top-6 right-6"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                      {program.icon}
                    </div>
                  </motion.div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {program.title}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {program.subtitle}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Tools */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className={`w-2 h-2 bg-${program.accentColor}-500 rounded-full mr-3`} />
                      Tools & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.tools.map((tool, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge 
                            variant="outline" 
                            className={`border-${program.accentColor}-200 text-${program.accentColor}-700 hover:bg-${program.accentColor}-50`}
                          >
                            {tool}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <div className={`w-2 h-2 bg-${program.accentColor}-500 rounded-full mr-3`} />
                      Core Skills
                    </h4>
                    <div className="space-y-2">
                      {program.skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center text-gray-600"
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i, duration: 0.4 }}
                        >
                          <CheckCircle className={`w-4 h-4 text-${program.accentColor}-500 mr-3 flex-shrink-0`} />
                          <span className="text-sm">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="border-t border-gray-100 pt-6 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Trophy className={`w-4 h-4 text-${program.accentColor}-500 mr-2`} />
                      Career Outcomes
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {program.outcomes.map((outcome, i) => (
                        <div key={i} className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                          {outcome}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <motion.div 
                    className="mt-auto"
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className={`w-full group text-lg py-3 bg-gradient-to-r from-${program.accentColor}-500 to-${program.accentColor}-600 hover:from-${program.accentColor}-600 hover:to-${program.accentColor}-700 text-white shadow-lg`}
                      onClick={() => onApplyClick(program.id)}
                    >
                      Choose {program.title}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Program Options */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Both tracks are available in two formats to fit your schedule and career goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {programOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className={`p-8 border-2 transition-all duration-300 relative overflow-hidden ${
                option.popular 
                  ? 'border-blue-500 shadow-xl bg-gradient-to-br from-blue-50 via-white to-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-lg bg-white'
              }`}>
                {option.popular && (
                  <>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 shadow-lg">
                        🏆 Most Popular
                      </Badge>
                    </div>
                    {option.savings && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm">
                          {option.savings}
                        </Badge>
                      </div>
                    )}
                  </>
                )}
                
                <div className="text-center mb-8 pt-4">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{option.name}</h4>
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-blue-600 font-semibold">{option.duration}</span>
                  </div>
                  
                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      {option.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {option.originalPrice}
                        </span>
                      )}
                      <motion.span 
                        className={`text-4xl font-bold ${
                          option.popular ? 'text-blue-600' : 'text-gray-900'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {option.price}
                      </motion.span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">One-time payment</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {option.features.map((feature, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Removed individual apply buttons - will add single button after cards */}

                {/* Value proposition */}
                <div className={`mt-4 text-center text-sm ${
                  option.popular ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {option.popular 
                    ? "🎯 Best value for career transformation" 
                    : "💡 Perfect for getting started"
                  }
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Single Apply Button for Both Programs */}
        <motion.div
          className="text-center mt-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white text-xl px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              onClick={() => onApplyClick(null, null)}
            >
              <span className="flex items-center">
                Apply Now - Choose Your Track
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
          <p className="text-gray-600 mt-4 text-lg">
            Select your preferred track and program during the application process
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}