import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "How long is each program?",
      answer: "LaunchPad runs 8 weeks. Professional runs 12 weeks and includes a 4-week internship plus 1:1 mentorship."
    },
    {
      question: "Do I need prior experience?",
      answer: "No. We welcome motivated beginners and career shifters."
    },
    {
      question: "How do payments work?",
      answer: "Pay in full, or split 50/50: 50% to enrol, 50% due by Week 4. Full refund if you cancel at least 7 days before the start date."
    },
    {
      question: "Do I get a certificate?",
      answer: "Yes—upon successful completion."
    },
    {
      question: "Is the program online or hybrid?",
      answer: "Both options are available; choose what suits you during application."
    },
    {
      question: "What's included in Professional that's not in LaunchPad?",
      answer: "A 4-week internship and one-on-one mentorship, plus deeper project work."
    }
  ];

  return (
    <motion.section 
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our programs.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="bg-gray-50 rounded-2xl px-6 border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.section>
  );
}