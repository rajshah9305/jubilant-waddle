import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { BrainCircuit, Key, Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiKeyModal } from '@/components/modals/api-key-modal';
import { UserProfile } from './user-profile';
import { MobileMenu } from './mobile-menu';
import { useApiKey } from '@/hooks/use-api-key';

export default function Header() {
  const [location] = useLocation();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isValid } = useApiKey();

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Analytics', href: '/analytics' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Cerebras Studio
              </span>
            </Link>
            
            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 bg-gray-50/80 rounded-full p-1 backdrop-blur-sm">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-white text-orange-600 shadow-lg shadow-orange-500/10'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-white/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Enhanced Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={() => setShowApiKeyModal(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                <Key className="w-4 h-4 mr-2" />
                API Keys
                <div
                  className={`w-2 h-2 rounded-full ml-2 ${
                    isValid ? 'bg-green-400' : 'bg-red-400'
                  }`}
                />
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
