import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { ArrowLeft, Zap, BarChart3, Settings, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { StudioSidebar } from '@/components/studio/studio-sidebar';
import { ChatInterface } from '@/components/studio/chat-interface';
import { MissingApiKeyModal } from '@/components/modals/missing-api-key-modal';
import { ApiKeyModal } from '@/components/modals/api-key-modal';
import { useApiKey } from '@/hooks/use-api-key';
import { StudioType } from '@/types/studio';

export default function Studio() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [currentStudio, setCurrentStudio] = useState<StudioType>('text');
  const [showMissingApiKeyModal, setShowMissingApiKeyModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const { isValid: apiKeyValid } = useApiKey();

  useEffect(() => {
    // Set studio from URL params
    if (params.studioType && ['text', 'code', 'document', 'creative'].includes(params.studioType)) {
      setCurrentStudio(params.studioType as StudioType);
    }
  }, [params.studioType]);

  const handleStudioChange = (studio: StudioType) => {
    if (!apiKeyValid) {
      setShowMissingApiKeyModal(true);
      return;
    }
    setCurrentStudio(studio);
    // Update URL without full navigation
    window.history.replaceState(null, '', `/studio/${studio}`);
  };

  const handleApiKeyRequired = () => {
    setShowMissingApiKeyModal(true);
  };

  const handleConfigureApiKey = () => {
    setShowApiKeyModal(true);
  };

  const studioTitles = {
    text: 'Text Generation Studio',
    code: 'Code Generation Studio', 
    document: 'Document AI Studio',
    creative: 'Creative Writing Studio'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/40 relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-br from-orange-500/10 to-yellow-400/10 rounded-full blur-2xl floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Enhanced Main Content */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-14rem)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Enhanced Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-effect rounded-3xl premium-shadow-lg h-full overflow-hidden border-0">
              <StudioSidebar
                currentStudio={currentStudio}
                onStudioChange={handleStudioChange}
              />
            </div>
          </motion.div>

          {/* Enhanced Chat Interface */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-effect rounded-3xl premium-shadow-lg h-full overflow-hidden border-0">
              <ChatInterface
                studioType={currentStudio}
                apiKeyValid={apiKeyValid}
                onApiKeyRequired={handleApiKeyRequired}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Performance Indicators */}
        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { label: 'Response Time', value: '1.2s', icon: Zap, color: 'from-orange-500 to-red-500', delay: 0.1 },
            { label: 'Tokens Used', value: '2,847', icon: BarChart3, color: 'from-blue-500 to-purple-500', delay: 0.2 },
            { label: 'Quality Score', value: '98%', icon: Zap, color: 'from-green-500 to-emerald-500', delay: 0.3 }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              className="glass-effect rounded-2xl p-6 premium-shadow hover-lift group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + metric.delay }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-3xl font-black text-gradient">{metric.value}</p>
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-2 group-hover:w-16 transition-all duration-300"></div>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modals */}
      <MissingApiKeyModal
        open={showMissingApiKeyModal}
        onOpenChange={setShowMissingApiKeyModal}
        onConfigureApiKey={handleConfigureApiKey}
      />

      <ApiKeyModal
        open={showApiKeyModal}
        onOpenChange={setShowApiKeyModal}
      />
    </div>
  );
}