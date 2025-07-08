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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20 pt-16 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-300/15 to-purple-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-12 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/')}
              className="flex items-center space-x-2 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 px-4 py-2 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-semibold">Back to Dashboard</span>
            </Button>
            
            <div className="hidden md:block h-6 w-px bg-gray-300"></div>
            
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-black text-gray-900">
                {studioTitles[currentStudio]}
              </h1>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Main Content */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-12rem)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl h-full overflow-hidden">
              <StudioSidebar
                currentStudio={currentStudio}
                onStudioChange={handleStudioChange}
              />
            </div>
          </div>

          {/* Enhanced Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl h-full overflow-hidden">
              <ChatInterface
                studioType={currentStudio}
                apiKeyValid={apiKeyValid}
                onApiKeyRequired={handleApiKeyRequired}
              />
            </div>
          </div>
        </motion.div>

        {/* Performance Indicators */}
        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-white to-orange-50/30 backdrop-blur-xl rounded-xl border border-gray-200/50 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-orange-600">1.2s</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-orange-50/30 backdrop-blur-xl rounded-xl border border-gray-200/50 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tokens Used</p>
                <p className="text-2xl font-bold text-orange-600">2,847</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-orange-50/30 backdrop-blur-xl rounded-xl border border-gray-200/50 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quality Score</p>
                <p className="text-2xl font-bold text-orange-600">98%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
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
