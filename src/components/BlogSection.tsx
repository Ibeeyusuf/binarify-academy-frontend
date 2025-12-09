import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";

export function BlogSection() {
  const blogPosts = [
    {
      title: "LaunchPad vs Professional: Which Track Fits You?",
      excerpt: "Not sure whether to pick the 8-week LaunchPad or the 12-week Professional track? This quick guide compares time commitment, mentorship, internship, and outcomes—so you can choose the path that matches your goals and schedule.",
      category: "Career Tips",
      date: "27 Sept 2025",
      slug: "/blog/launchpad-vs-professional"
    },
    {
      title: "A Day in the Life of a QA Analyst (Tools, Tasks, Tips)",
      excerpt: "Curious what QA analysts really do? Walk through a typical workday—stand-ups, test planning, bug reporting—and the exact tools you'll learn at Binarify (Postman, JMeter, Jira) to hit the ground running.",
      category: "QA Skills",
      date: "27 Sept 2025",
      slug: "/blog/day-in-the-life-qa-analyst"
    },
    {
      title: "How to Build a PM Portfolio Without \"Experience\"",
      excerpt: "No prior role? No problem. Learn how to turn class projects, volunteer work, and simple product case studies into a credible project management portfolio that recruiters actually read.",
      category: "PM Skills", 
      date: "27 Sept 2025",
      slug: "/blog/build-pm-portfolio-without-experience"
    }
  ];

  return (
    <motion.section 
      className="py-20 bg-gray-50"
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
            From the Blog
          </h2>
          <p className="text-xl text-gray-600">
            Insights, tips, and student stories from Binarify Academy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              whileHover={{ y: -10 }}
            >
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge variant="secondary" className="text-xs px-3 py-1">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  {post.excerpt}
                </p>
                
                <motion.div 
                  className="mt-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-purple-600 hover:text-purple-700 hover:bg-transparent group"
                  >
                    Read more 
                    <motion.div
                      className="ml-1"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}