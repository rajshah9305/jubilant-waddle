import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { BrainCircuit, Key, Menu, Sparkles, Moon, Sun, Bell, Settings, BarChart3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApiKeyModal } from '@/components/modals/api-key-modal';
import { UserProfile } from './user-profile';
import { MobileMenu } from './mobile-menu';
import { useApiKey } from '@/hooks/use-api-key';
import { useTheme } from '@/hooks/use-theme';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [location] = useLocation();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const { isValid } = useApiKey();
  // const { theme, toggleTheme } = useTheme(); // Temporarily disabled

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Settings', href: '/settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Enterprise Logo */}
            <Link href="/" className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-orange-500/30 transition-all duration-400 group-hover:rotate-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-orange-700 to-gray-900 bg-clip-text text-transparent leading-tight">
                  Cerebras Studio
                </span>
                <div className="text-xs text-gray-500 font-bold tracking-wider uppercase opacity-80">
                  Enterprise AI Platform
                </div>
              </div>
            </Link>
            
            {/* Enhanced Enterprise Navigation with Dark Mode & Notifications */}
            <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-gray-50/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-700/90 rounded-2xl p-2 backdrop-blur-lg border border-gray-200/60 dark:border-gray-600/60 shadow-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-8 py-3 text-sm font-bold rounded-xl transition-all duration-400 relative overflow-hidden group ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/20'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {!isActive(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Enhanced Enterprise Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 relative"
                >
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white border-2 border-white flex items-center justify-center">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
                
                {/* Notification Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-2xl p-4 z-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNotificationCount(0)}
                          className="text-xs text-orange-600 hover:text-orange-700"
                        >
                          Clear All
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-orange-50 rounded-xl border border-orange-200/60">
                          <p className="text-sm font-medium text-gray-900">System Update</p>
                          <p className="text-xs text-gray-600">New AI models are now available</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/60">
                          <p className="text-sm font-medium text-gray-900">Usage Alert</p>
                          <p className="text-xs text-gray-600">You've used 80% of your monthly tokens</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-xl border border-green-200/60">
                          <p className="text-sm font-medium text-gray-900">Performance</p>
                          <p className="text-xs text-gray-600">Your projects are running smoothly</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark Mode Toggle (placeholder) */}
              <Button
                variant="ghost"
                size="sm"
                className="p-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
                onClick={() => {
                  // toggleTheme(); // Will be enabled when theme is ready
                }}
              >
                <Sun className="w-5 h-5" />
              </Button>

              {/* API Key Button */}
              <Button
                onClick={() => setShowApiKeyModal(true)}
                className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-red-600 text-white font-bold px-6 py-3 shadow-xl hover:shadow-orange-500/30 transition-all duration-400 transform hover:scale-105 rounded-xl relative overflow-hidden group"
              >
                <div className="flex items-center space-x-3 relative z-10">
                  <Key className="w-5 h-5" />
                  <span>API Keys</span>
                  <div
                    className={`w-3 h-3 rounded-full animate-pulse ${
                      isValid ? 'bg-green-300 shadow-lg shadow-green-500/40' : 'bg-red-300 shadow-lg shadow-red-500/40'
                    }`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </Button>
              
              <UserProfile />
            </div>

            {/* Enhanced Mobile Actions */}
            <div className="flex md:hidden items-center space-x-2">
              <UserProfile />
              <Button
                variant="ghost"
                size="sm"
                className="p-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
                onClick={() => setShowMobileMenu(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <ApiKeyModal 
        open={showApiKeyModal} 
        onOpenChange={setShowApiKeyModal} 
      />
      
      <MobileMenu
        open={showMobileMenu}
        onOpenChange={setShowMobileMenu}
        navigation={navigation}
        isActive={isActive}
      />
    </>
  );
}
