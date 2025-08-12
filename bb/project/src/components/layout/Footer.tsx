import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Mail, Globe, Shield } from 'lucide-react';
import { scrollRevealVariants, staggerContainer } from '../../utils/animations';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <motion.div variants={scrollRevealVariants} className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
            <img 
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=132,fit=crop/mv0Jz8pJzrH5VznP/sustainably-yours-_logo-dJobDRk8LxC1JRnx.jpg" 
              alt="Your Logo" 
              className="h-8 w-auto"
            />
          </div>

            <p className="text-slate-600 mb-4">
              Join thousands of organizations and individuals committed to achieving
              net-zero emissions and creating a sustainable future for all.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="mailto:netzero@kreenz.com"
                whileHover={{ scale: 1.1 }}
                className="text-slate-400 hover:text-emerald-500 transition-colors"
                aria-label="Email us"
              >
                <Mail className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://greenpositive.org/"
                whileHover={{ scale: 1.1 }}
                className="text-slate-400 hover:text-emerald-500 transition-colors"
                aria-label="Visit our website"
              >
                <Globe className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={scrollRevealVariants}>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['About Us', 'How It Works', 'Resources', 'FAQ', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-emerald-600 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={scrollRevealVariants}>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Data Protection'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-emerald-600 transition-colors text-sm flex items-center"
                  >
                    {link === 'Privacy Policy' && <Shield className="h-3 w-3 mr-1" />}
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-slate-200"
        >
          <p className="text-center text-sm text-slate-500">
            © 2025 Sustainably Yours® Platform. All rights reserved. Built with accessibility and sustainability in mind.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};