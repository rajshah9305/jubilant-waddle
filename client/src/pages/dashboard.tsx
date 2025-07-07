import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { PenTool, Code, FileText, Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroCanvas } from '@/components/three/hero-canvas';
import { StudioCard } from '@/components/cards/studio-card';
import { MissingApiKeyModal } from '@/components/modals/missing-api-key-modal';
import { ApiKeyModal } from '@/components/modals/api-key-modal';
import { useApiKey } from '@/hooks/use-api-key';
import { StudioType } from '@/types/studio';

const studioConfigs = [
  {
    id: 'text' as StudioType,
    title: 'Text Generation',
    description: 'Create compelling content, articles, and marketing copy with advanced AI text generation.',
    icon: PenTool,
    tags: ['Articles', 'Marketing', 'Blog Posts'],
  },
  {
    id: 'code' as StudioType,
    title: 'Code Generation',
    description: 'Generate, debug, and optimize code across multiple programming languages.',
    icon: Code,
    tags: ['Python', 'JavaScript', 'React'],
  },
  {
    id: 'document' as StudioType,
    title: 'Document AI',
    description: 'Analyze, summarize, and extract insights from documents and PDFs.',
    icon: FileText,
    tags: ['Analysis', 'Summary', 'Extract'],
  },
  {
    id: 'creative' as StudioType,
    title: 'Creative Writing',
    description: 'Craft stories, poetry, screenplays, and creative content with AI-powered inspiration.',
    icon: Feather,
    tags: ['Stories', 'Poetry', 'Scripts'],
  },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [showMissingApiKeyModal, setShowMissingApiKeyModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const { isValid: apiKeyValid } = useApiKey();

  const handleStudioClick = (studioType: StudioType) => {
    if (!apiKeyValid) {
      setShowMissingApiKeyModal(true);
      return;
    }
    setLocation(`/studio/${studioType}`);
  };

  const handleConfigureApiKey = () => {
    setShowApiKeyModal(true);
  };

  return (
    <div className="pt-16">
      {/* Hero Section - Compact Design */}
      <section className="min-h-[80vh] bg-gradient-to-br from-gray-50 via-orange-50/30 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content - Enhanced Premium Design */}
            <motion.div 
              className="space-y-10 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Floating background elements */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-1/2 -left-10 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-2xl animate-bounce"></div>
              


              <div className="space-y-6">
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  AI Creative
                  <motion.span 
                    className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent block relative"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: "100% 50%" }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Studio
                    <motion.div
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, delay: 1 }}
                    />
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-600 max-w-2xl leading-relaxed font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Unleash your creativity with four specialized AI studios. Generate compelling content, optimize code, analyze documents, and craft engaging stories.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 border-0 rounded-xl relative overflow-hidden group"
                  onClick={() => handleStudioClick('text')}
                >
                  <span className="flex items-center space-x-2 relative z-10">
                    <span>Start Creating</span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="text-2xl"
                    >
                      →
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </motion.div>

              {/* Compact Real-time Metrics */}
              <motion.div 
                className="grid grid-cols-2 gap-4 pt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div 
                  className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2 relative z-10">2.4M+</div>
                  <div className="text-gray-600 font-semibold text-sm relative z-10">Tokens Generated</div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </motion.div>
                <motion.div 
                  className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2 relative z-10">150ms</div>
                  <div className="text-gray-600 font-semibold text-sm relative z-10">Avg Response Time</div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side - Premium 3D Visual Experience */}
            <motion.div 
              className="hidden lg:flex justify-center items-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-[400px] h-[400px] relative">
                {/* Premium backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 rounded-full blur-3xl"></div>
                
                <HeroCanvas />
                
                {/* Enhanced floating elements with better hierarchy */}
                <motion.div 
                  className="absolute top-16 left-16 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-25"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.25, 0.4, 0.25]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-24 right-16 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full opacity-30"
                  animate={{ 
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-1/2 left-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-16 left-1/3 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-25"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                
                {/* Additional premium visual elements */}
                <motion.div 
                  className="absolute top-1/3 right-8 w-6 h-6 bg-gradient-to-br from-red-400 to-orange-600 rounded-full opacity-30"
                  animate={{ 
                    x: [0, 10, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-3/4 left-20 w-4 h-4 bg-gradient-to-br from-orange-300 to-yellow-500 rounded-full opacity-35"
                  animate={{ 
                    y: [0, -15, 0],
                    scale: [1, 1.4, 1]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Studios Grid Section - Compact Design */}
      <section className="py-16 bg-gradient-to-br from-white via-orange-50/20 to-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Creative Studio
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Four specialized AI environments designed for different creative workflows
            </p>
          </motion.div>

          {/* Consistent Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {studioConfigs.map((studio, index) => (
              <motion.div
                key={studio.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StudioCard
                  {...studio}
                  onClick={() => handleStudioClick(studio.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
