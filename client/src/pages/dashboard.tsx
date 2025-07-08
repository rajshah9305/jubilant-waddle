import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { PenTool, Code, FileText, Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroCanvas } from '@/components/three/hero-canvas';
import { StudioCard } from '@/components/cards/studio-card';
import { MissingApiKeyModal } from '@/components/modals/missing-api-key-modal';
import { ApiKeyModal } from '@/components/modals/api-key-modal';
import { QuickActions } from '@/components/ui/quick-actions';
import { useApiKey } from '@/hooks/use-api-key';
import { StudioType } from '@/types/studio';

const studioConfigs = [
  {
    id: 'text' as StudioType,
    title: 'Text Generation',
    description: 'Create compelling content, articles, and marketing copy with advanced AI text generation powered by cutting-edge technology.',
    icon: PenTool,
    tags: ['Marketing Copy', 'Blog Articles', 'Social Media'],
  },
  {
    id: 'code' as StudioType,
    title: 'Code Generation',
    description: 'Generate, debug, and optimize code across multiple programming languages with intelligent suggestions.',
    icon: Code,
    tags: ['Python & JS', 'React & Vue', 'API Design'],
  },
  {
    id: 'document' as StudioType,
    title: 'Document AI',
    description: 'Analyze, summarize, and extract insights from documents, PDFs, and complex data sources instantly.',
    icon: FileText,
    tags: ['PDF Analysis', 'Data Extract', 'Smart Summary'],
  },
  {
    id: 'creative' as StudioType,
    title: 'Creative Writing',
    description: 'Craft engaging stories, poetry, screenplays, and creative content with AI-powered inspiration and guidance.',
    icon: Feather,
    tags: ['Story Crafting', 'Poetry & Prose', 'Script Writing'],
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
      {/* Hero Section - Premium Awwwards-Style Design */}
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20 relative overflow-hidden">
        {/* Sophisticated Background Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-red-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
            {/* Left Content - Award-Winning Typography */}
            <motion.div 
              className="lg:col-span-7 space-y-12 relative"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-xl border border-orange-200/50 rounded-full px-6 py-3 shadow-xl"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-gray-700 tracking-wide">ENTERPRISE AI PLATFORM</span>
              </motion.div>
              


              {/* Award-Winning Headline */}
              <div className="space-y-12">
                <motion.h1 
                  className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                >
                  <span className="block text-gray-900 mb-2">Create</span>
                  <span className="block text-gray-900 mb-2">Beyond</span>
                  <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent relative">
                    Limits
                    <motion.div
                      className="absolute -bottom-4 left-0 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                    />
                  </span>
                </motion.h1>
                
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <p className="text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed font-light">
                    Four specialized AI environments engineered for{' '}
                    <span className="font-semibold text-gray-900">exceptional creative output</span>
                  </p>
                  
                  {/* Premium Stats */}
                  <div className="flex flex-wrap gap-8 pt-4">
                    {[
                      { label: 'Processing Speed', value: '10x faster' },
                      { label: 'Accuracy Rate', value: '99.7%' },
                      { label: 'Studios Available', value: '4' }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-2xl font-black text-orange-600">{stat.value}</div>
                        <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-10 py-5 text-xl font-bold shadow-xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 border-0 rounded-xl relative overflow-hidden group"
                  onClick={() => handleStudioClick('text')}
                >
                  <span className="flex items-center space-x-3 relative z-10">
                    <span>Start Creating</span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 8 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="text-3xl"
                    >
                      →
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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

            {/* Premium Call-to-Action */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-10 py-6 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1 text-lg"
                  onClick={() => handleStudioClick('text')}
                >
                  Start Creating
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 hover:border-orange-300 text-gray-700 hover:text-orange-600 font-bold px-10 py-6 rounded-2xl hover:bg-orange-50 transition-all duration-300 text-lg backdrop-blur-sm bg-white/80"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side - Premium 3D Visual Experience */}
            <motion.div 
              className="lg:col-span-5 flex justify-center items-center relative"
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            >
              <div className="w-full max-w-[600px] h-[600px] relative">
                {/* Sophisticated Glass Morphism Container */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                  {/* Premium Glass Effects */}
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-500/10 to-transparent"></div>
                </div>
                
                <div className="absolute inset-4 flex items-center justify-center">
                  <HeroCanvas />
                </div>
                
                {/* Floating UI Elements */}
                <motion.div 
                  className="absolute top-8 left-8 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/30"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg"></div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30"
                  animate={{ 
                    y: [0, 8, 0],
                    rotate: [0, -1, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="text-sm font-bold text-gray-700">AI Processing</div>
                  <div className="text-xs text-gray-500">99.7% Accuracy</div>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 left-4 bg-gradient-to-br from-blue-500/90 to-purple-500/90 backdrop-blur-xl rounded-full w-12 h-12 shadow-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-1/2 left-4 w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-16 left-1/3 w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full opacity-15"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 90, 180]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                
                {/* Additional minimal visual elements */}
                <motion.div 
                  className="absolute top-1/3 right-8 w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-12"
                  animate={{ 
                    x: [0, 5, 0],
                    opacity: [0.12, 0.2, 0.12]
                  }}
                  transition={{ duration: 7, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-3/4 left-20 w-3 h-3 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-18"
                  animate={{ 
                    y: [0, -8, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Studios Grid Section - Awwwards Premium Design */}
      <section className="py-32 bg-gradient-to-br from-slate-50 via-white to-orange-50/30 relative overflow-hidden">
        {/* Sophisticated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Premium Section Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-6 py-3 mb-8"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              <span className="text-sm font-bold text-gray-700 tracking-wider uppercase">AI Studios</span>
            </motion.div>

            <h2 className="text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tighter">
              Choose Your{' '}
              <span className="block lg:inline bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Creative Space
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
              Four specialized AI environments engineered for{' '}
              <span className="font-semibold text-gray-800">exceptional creative output</span>
            </p>
            
            {/* Premium Visual Separator */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            />
          </motion.div>v>

          {/* Enhanced Grid Layout with Better Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10">
            {studioConfigs.map((studio, index) => (
              <motion.div
                key={studio.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15, type: "spring", damping: 25 }}
                viewport={{ once: true }}
                className="h-full"
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

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-8 leading-tight">
              How It{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose a Studio",
                description: "Select from Text, Code, Document, or Creative Writing studios based on your project needs.",
                icon: "🎯"
              },
              {
                step: "02", 
                title: "Input Your Prompt",
                description: "Describe what you want to create or analyze. Upload files for document analysis.",
                icon: "✍️"
              },
              {
                step: "03",
                title: "Generate & Refine",
                description: "Get AI-powered results instantly. Refine and iterate until it's perfect.",
                icon: "✨"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <div className="text-sm font-bold text-orange-500 mb-2">STEP {item.step}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Creators
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              See what our users are saying about their creative experience
            </p>
          </motion.div>

          {/* Success Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { metric: "50K+", label: "Active Users", icon: "👥" },
              { metric: "2.4M+", label: "Content Created", icon: "📝" },
              { metric: "98%", label: "Satisfaction Rate", icon: "⭐" },
              { metric: "5hrs", label: "Average Time Saved", icon: "⏱️" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                  {stat.metric}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform has revolutionized my content creation workflow. The AI suggestions are incredibly accurate and save me hours every week.",
                name: "Sarah Chen",
                role: "Content Marketing Manager",
                company: "TechFlow",
                avatar: "SC"
              },
              {
                quote: "The code generation studio is a game-changer. It helps me prototype faster and catch bugs I would have missed.",
                name: "Marcus Rodriguez",
                role: "Senior Developer",
                company: "DevCorp",
                avatar: "MR"
              },
              {
                quote: "Document analysis made easy. I can now process research papers in minutes instead of hours.",
                name: "Dr. Emily Watson",
                role: "Research Scientist",
                company: "Innovation Labs",
                avatar: "EW"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-orange-500 text-sm font-semibold">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="absolute top-4 right-4 text-orange-300 text-6xl opacity-20">
                  "
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Our Platform
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Save Hours Daily",
                description: "Automate repetitive tasks and focus on what matters most",
                icon: "⚡"
              },
              {
                title: "Eliminate Writer's Block",
                description: "Never run out of ideas with AI-powered creative assistance",
                icon: "🧠"
              },
              {
                title: "Boost Productivity",
                description: "Complete projects faster with intelligent automation",
                icon: "🚀"
              },
              {
                title: "Unlock New Possibilities",
                description: "Explore creative directions you never thought possible",
                icon: "🌟"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How do I get started?",
                answer: "Simply choose a studio that matches your needs, enter your creative prompt, and let our AI generate amazing results. No complex setup required."
              },
              {
                question: "Is my data secure and private?",
                answer: "Yes, we use enterprise-grade encryption and never store your personal content. Your data is processed securely and deleted after use."
              },
              {
                question: "Can I use this for commercial projects?",
                answer: "Absolutely! All content generated through our platform can be used for commercial purposes. You own the rights to your creations."
              },
              {
                question: "What file formats do you support?",
                answer: "We support most common formats including PDF, DOC, TXT for documents, and various image formats for creative projects."
              },
              {
                question: "How accurate are the AI results?",
                answer: "Our AI models are trained on high-quality data and continuously improved. Most users report 95%+ satisfaction with the generated content."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Enterprise-Grade{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Security
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your data is protected with the highest security standards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "256-bit Encryption",
                description: "All data is encrypted in transit and at rest using military-grade security",
                icon: "🔒"
              },
              {
                title: "Privacy First",
                description: "We never store or share your personal content. Your creations remain yours",
                icon: "🛡️"
              },
              {
                title: "GDPR Compliant",
                description: "Full compliance with international privacy regulations and standards",
                icon: "✅"
              }
            ].map((security, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-6">{security.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{security.title}</h3>
                <p className="text-gray-600 leading-relaxed">{security.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Transform Your Creative Process?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of creators who are already using AI to bring their ideas to life
            </p>
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 border-0 rounded-xl"
              onClick={() => handleStudioClick('text')}
            >
              Start Creating Now
            </Button>
          </motion.div>
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
      
      {/* Quick Actions FAB */}
      <QuickActions />
    </div>
  );
}
