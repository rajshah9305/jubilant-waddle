import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircle, FileText, BarChart3, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      icon: MessageCircle,
      label: 'New Chat',
      href: '/studio/text',
      gradient: 'from-blue-500 to-indigo-500',
      description: 'Start a new conversation'
    },
    {
      icon: FileText,
      label: 'New Project',
      href: '/projects',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Create a new project'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      href: '/analytics',
      gradient: 'from-purple-500 to-violet-500',
      description: 'View your analytics'
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/settings',
      gradient: 'from-orange-500 to-red-500',
      description: 'Configure your account'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={action.href}>
                    <Button
                      className={`flex items-center space-x-3 bg-gradient-to-r ${action.gradient} text-white px-6 py-3 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 min-w-[180px] justify-start`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="text-left">
                        <p className="font-bold text-sm">{action.label}</p>
                        <p className="text-xs opacity-90">{action.description}</p>
                      </div>
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}