import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { BrainCircuit, Key, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiKeyModal } from '@/components/modals/api-key-modal';
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
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-gray-900">
                Cerebras Studio
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <Button
                onClick={() => setShowApiKeyModal(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Key className="w-4 h-4 mr-2" />
                API Keys
                <div
                  className={`w-2 h-2 rounded-full ml-2 ${
                    isValid ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
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
