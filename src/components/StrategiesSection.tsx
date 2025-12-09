import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Users, HandHeart, Briefcase, Award, Building2, Zap, Star, ArrowRight, CheckCircle, Target } from "lucide-react";

export function PartnersSection() {
  const mentorshipFeatures = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Industry Mentors",
      description: "Connect with seasoned professionals from top tech companies who provide guidance, insights, and career advice throughout your journey.",
      image: "https://images.unsplash.com/photo-1618173887111-3ecfc91c41b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3IlMjBtZW50b3JzaGlwJTIwYnVzaW5lc3MlMjBndWlkYW5jZXxlbnwxfHx8fDE3NTkwMjE0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: [
        "Weekly 1:1 sessions",
        "Career guidance",
        "Technical review",
        "Interview preparation"
      ],
      color: "blue",
      gradient: "from-blue-500 via-blue-600 to-blue-700"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Real-World Internships",
      description: "Gain hands-on experience with our partner companies through structured 4-week internship programs that simulate real workplace environments.",
      image: "https://images.unsplash.com/photo-1635185481431-661b09594e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5zaGlwJTIwd29ya3BsYWNlJTIwY29sbGFib3JhdGlvbiUyMHRlYW18ZW58MXx8fHwxNzU5MDIxNDIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: [
        "Live project work",
        "Team collaboration",
        "Professional feedback",
        "Portfolio building"
      ],
      color: "emerald",
      gradient: "from-emerald-500 via-emerald-600 to-emerald-700"
    }
  ];

  const supportFeatures = [
    {
      icon: <HandHeart className="w-6 h-6" />,
      title: "Personalized 1:1 Support",
      description: "Regular sessions with dedicated mentors"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Professional References",
      description: "Industry references for job applications"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Career Placement",
      description: "Job placement assistance and networking"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Portfolio Review",
      description: "Expert feedback on your work"
    }
  ];

  const partnerTypes = [
    {
      category: "Tech Startups",
      description: "Fast-paced innovative companies",
      count: "15+"
    },
    {
      category: "Enterprise Companies",
      description: "Established industry leaders",
      count: "8+"
    },
    {
      category: "Consulting Firms",
      description: "Professional services organizations",
      count: "12+"
    },
    {
      category: "Non-Profits",
      description: "Mission-driven organizations",
      count: "6+"
    }
  ];

  const stats = [
    { number: "95%", label: "Mentor Satisfaction Rate" },
    { number: "4.8/5", label: "Internship Experience Rating" },
    { number: "87%", label: "Job Placement within 3 months" }
  ];

  return (
    <motion.section 
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-32 left-16 w-80 h-80 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ 
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-32 right-16 w-64 h-64 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0]
          }}
          transition={{ 
            duration: 28,
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
            <Badge className="mb-4 px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200">
              🤝 Professional Network
            </Badge>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Mentorship & Internship Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Connect with industry leaders and gain real-world experience through our comprehensive 
            mentorship program and internship partnerships with top-tier companies.
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {mentorshipFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.3,
                ease: "easeOut"
              }}
            >
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm h-full">
                {/* Image Header */}
                <div className="relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-60`} />
                  
                  {/* Floating Icon */}
                  <motion.div 
                    className="absolute top-6 right-6"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                  </motion.div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-4">
                    {feature.features.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center space-x-3"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                      >
                        <CheckCircle className={`w-5 h-5 text-${feature.color}-500 flex-shrink-0`} />
                        <span className="text-gray-700 font-medium text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mb-20"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-12 border-0 shadow-xl bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Program Success Metrics</h3>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                  Our mentorship and internship programs consistently deliver outstanding results
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    <motion.div 
                      className="text-4xl lg:text-5xl font-bold mb-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-blue-100 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Support Features */}
        <motion.div 
          className="mb-20"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Support System
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Every aspect of your professional development is covered through our integrated support network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center bg-white/80 backdrop-blur-sm">
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-blue-600">
                      {feature.icon}
                    </div>
                  </motion.div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partner Categories */}
        <motion.div 
          className="text-center"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Industry Partners
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We've partnered with diverse organizations across the tech ecosystem to provide 
              rich internship experiences and mentorship opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center bg-white/80 backdrop-blur-sm">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Building2 className="w-8 h-8 text-blue-600" />
                  </motion.div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {partner.count}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {partner.category}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {partner.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white max-w-2xl mx-auto">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Connect with Industry Leaders?
              </h4>
              <p className="text-gray-600 mb-6">
                Join our Professional track to access exclusive mentorship and internship opportunities
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8"
                >
                  Apply for Professional Track
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}