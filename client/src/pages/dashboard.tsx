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
      {/* Hero Section - Premium Design */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
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
              
              <motion.div
                className="inline-block"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 px-6 py-3 rounded-full text-sm font-bold border border-orange-200 shadow-lg backdrop-blur-sm">
                  ✨ Powered by Advanced AI Technology
                </span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1 
                  className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.85] tracking-tight"
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
                      className="absolute -bottom-3 left-0 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, delay: 1 }}
                    />
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-2xl text-gray-600 max-w-2xl leading-relaxed font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Unleash your creativity with four specialized AI studios. Generate compelling content, optimize code, analyze documents, and craft engaging stories with cutting-edge artificial intelligence.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 border-0 rounded-2xl relative overflow-hidden group"
                  onClick={() => handleStudioClick('text')}
                >
                  <span className="flex items-center space-x-3 relative z-10">
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
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-3 border-gray-300 text-gray-700 px-12 py-6 text-xl font-bold hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 rounded-2xl backdrop-blur-sm hover:shadow-xl"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-2xl">▶</span>
                    <span>Watch Demo</span>
                  </span>
                </Button>
              </motion.div>

              {/* Enhanced Real-time Metrics */}
              <motion.div 
                className="grid grid-cols-2 gap-8 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div 
                  className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden group"
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="text-5xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4 relative z-10">2.4M+</div>
                  <div className="text-gray-600 font-bold text-lg relative z-10">Tokens Generated</div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </motion.div>
                <motion.div 
                  className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden group"
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="text-5xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4 relative z-10">150ms</div>
                  <div className="text-gray-600 font-bold text-lg relative z-10">Avg Response Time</div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
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
              <div className="w-[600px] h-[600px] relative">
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

      {/* Studios Grid Section - Premium Design */}
      <section className="py-32 bg-gradient-to-br from-white via-orange-50/20 to-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 px-6 py-3 rounded-full text-sm font-bold border border-orange-200 shadow-lg">
                🚀 Four Powerful AI Studios
              </span>
            </motion.div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Creative Studio
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Four specialized AI environments designed for different creative workflows and professional use cases
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
