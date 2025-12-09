import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X, GraduationCap, Target, Users, Award, Mail, Phone, LogIn } from "lucide-react";
import { useState } from "react";
import binarifyLogo from 'figma:asset/2d4139f6d573fd371eff786b014cb407518a6d7a.png';
import { LoginModal } from "./LoginModal"; // We'll create this

interface HeaderProps {
  onApplyClick: (track?: "project-management" | "quality-assurance" | null, program?: "launchpad" | "professional") => void;
}

export function Header({ onApplyClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // ADD THIS LINE

  // Navigation sections with their scroll targets
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const programsDropdown = [
    {
      title: "Project Management Track",
      description: "Lead projects, drive results",
      icon: <Users className="w-5 h-5" />,
      onClick: () => {
        scrollToSection('programs');
        setActiveDropdown(null);
      }
    },
    {
      title: "Quality Assurance Track", 
      description: "Ensure excellence, prevent defects",
      icon: <Target className="w-5 h-5" />,
      onClick: () => {
        scrollToSection('programs');
        setActiveDropdown(null);
      }
    }
  ];

  const applyDropdown = [
    {
      title: "LaunchPad Program",
      description: "8 weeks • ₦105,000",
      icon: <GraduationCap className="w-5 h-5" />,
      onClick: () => onApplyClick(null, "launchpad")
    },
    {
      title: "Professional Program",
      description: "12 weeks + internship • ₦205,000",
      icon: <Award className="w-5 h-5" />,
      popular: true,
      onClick: () => onApplyClick(null, "professional")
    },
    {
      title: "Project Management Track",
      description: "Choose your program format",
      icon: <Users className="w-5 h-5" />,
      onClick: () => onApplyClick("project-management")
    },
    {
      title: "Quality Assurance Track",
      description: "Choose your program format", 
      icon: <Target className="w-5 h-5" />,
      onClick: () => onApplyClick("quality-assurance")
    }
  ];

  const navigationItems = [
    { 
      name: 'Programs', 
      hasDropdown: true,
      dropdown: programsDropdown,
      onClick: () => scrollToSection('programs')
    },
    { 
      name: 'How It Works', 
      onClick: () => scrollToSection('learning')
    },
    { 
      name: 'Outcomes', 
      onClick: () => scrollToSection('outcomes')
    },
    { 
      name: 'Testimonials', 
      onClick: () => scrollToSection('testimonials')
    },
    { 
      name: 'Contact', 
      onClick: () => scrollToSection('footer')
    }
  ];

  const DropdownMenu = ({ items, isOpen }: { items: any[], isOpen: boolean }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 relative ${item.popular ? 'bg-blue-50' : ''}`}
              whileHover={{ backgroundColor: item.popular ? '#dbeafe' : '#f9fafb' }}
              onClick={item.onClick}
            >
              {item.popular && (
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )}
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${item.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div 
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => scrollToSection('hero')}
            >
              <img 
                src={binarifyLogo}
                alt="Binarify Academy"
                className="h-12 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav 
              className="hidden lg:flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {navigationItems.map((item, index) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.button
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    whileHover={{ y: -2 }}
                    onClick={item.onClick}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </motion.button>
                  
                  {item.hasDropdown && (
                    <DropdownMenu 
                      items={item.dropdown} 
                      isOpen={activeDropdown === item.name} 
                    />
                  )}
                </div>
              ))}
            </motion.nav>

            {/* Desktop CTA Buttons - UPDATED WITH LOGIN */}
            <motion.div 
              className="hidden lg:flex items-center space-x-3"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {/* Login Button - ADDED */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full flex items-center"
                  onClick={() => setIsLoginOpen(true)}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </motion.div>

              {/* Apply Now Button */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('apply')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full flex items-center"
                    onClick={onApplyClick}
                  >
                    Apply Now
                  </Button>
                </motion.div>
                
                {/* <DropdownMenu 
                  items={applyDropdown} 
                  isOpen={activeDropdown === 'apply'} 
                /> */}
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu - UPDATED WITH LOGIN */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-gray-100 mt-4 pt-4 pb-6"
              >
                <div className="space-y-4">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      onClick={item.onClick}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    {/* Mobile Login Button - ADDED */}
                    <Button 
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsLoginOpen(true);
                      }}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onApplyClick(null, "professional");
                      }}
                    >
                      Apply for Professional Program
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onApplyClick(null, "launchpad");
                      }}
                    >
                      Apply for LaunchPad Program
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}