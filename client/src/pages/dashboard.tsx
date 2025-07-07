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
    className: 'lg:col-span-2',
  },
  {
    id: 'code' as StudioType,
    title: 'Code Generation',
    description: 'Generate, debug, and optimize code across multiple programming languages.',
    icon: Code,
    tags: ['Python', 'JavaScript'],
    className: 'lg:col-span-1',
  },
  {
    id: 'document' as StudioType,
    title: 'Document AI',
    description: 'Analyze, summarize, and extract insights from documents and PDFs.',
    icon: FileText,
    tags: ['Analysis', 'Summary'],
    className: 'lg:col-span-1',
  },
  {
    id: 'creative' as StudioType,
    title: 'Creative Writing',
    description: 'Craft stories, poetry, screenplays, and creative content with AI-powered inspiration.',
    icon: Feather,
    tags: ['Stories', 'Poetry', 'Scripts'],
    className: 'lg:col-span-2',
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
      {/* Hero Section */}
      <section className="min-h-screen bg-pattern relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                  AI Creative
                  <span className="text-primary block">Studio</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Unleash your creativity with four specialized AI studios. 
                  Generate text, code, analyze documents, and craft stories.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-4 text-base"
                  onClick={() => handleStudioClick('text')}
                >
                  Start Creating
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 text-gray-700 px-8 py-4 text-base hover:border-primary"
                >
                  Watch Demo
                </Button>
              </div>

              {/* Real-time Metrics */}
              <motion.div 
                className="grid grid-cols-2 gap-6 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-primary">2.4M+</div>
                  <div className="text-gray-600">Tokens Generated</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200">
                  <div className="text-2xl font-extrabold text-primary">150ms</div>
                  <div className="text-gray-600">Avg Response Time</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - 3D Visual */}
            <motion.div 
              className="hidden lg:flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-96 h-96 relative">
                <HeroCanvas />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Studios Grid Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Choose Your Studio
            </h2>
            <p className="text-xl text-gray-600">
              Four specialized AI environments for different creative tasks
            </p>
          </motion.div>

          {/* Asymmetrical Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {studioConfigs.map((studio, index) => (
              <motion.div
                key={studio.id}
                className={studio.className}
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
