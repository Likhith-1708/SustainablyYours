import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  currentPage?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Organization Registration', href: '/login' },
    { name: 'Employee Registration', href: '/employee' },
    { name: 'Pledge Wall', href: '/pledge-wall' },
  ];

  return (
    <header className="bg-white border-b border-slate-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center"
            >
              <div className="flex items-center space-x-2">
              <a href="/">
                <img 
                  src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=132,fit=crop/mv0Jz8pJzrH5VznP/sustainably-yours-_logo-dJobDRk8LxC1JRnx.jpg" 
                  alt="Your Logo" 
                  className="h-8 w-auto"
                />
              </a>

              </div>
            </motion.div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2 }}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.href
                    ? 'text-emerald-600 border-b-2 border-emerald-500'
                    : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 py-4"
          >
            <div className="space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                    currentPage === item.href
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};