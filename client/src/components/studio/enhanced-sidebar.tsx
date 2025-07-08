import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, PenTool, Code, FileText, Feather, Crown, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { StudioType } from '@/types/studio';

interface EnhancedSidebarProps {
  currentStudio: StudioType;
  onStudioChange: (studio: StudioType) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const studioConfigs = [
  {
    id: 'text' as StudioType,
    title: 'Text Generation',
    description: 'Create compelling content and copy',
    icon: PenTool,
    tier: 'Popular',
    tierColor: 'bg-blue-100 text-blue-700',
    usage: 75,
    usageLimit: 100,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'code' as StudioType,
    title: 'Code Generation',
    description: 'Generate and optimize code',
    icon: Code,
    tier: 'Enhanced',
    tierColor: 'bg-green-100 text-green-700',
    usage: 45,
    usageLimit: 80,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'document' as StudioType,
    title: 'Document AI',
    description: 'Analyze and process documents',
    icon: FileText,
    tier: 'Pro',
    tierColor: 'bg-purple-100 text-purple-700',
    usage: 30,
    usageLimit: 60,
    color: 'from-purple-500 to-violet-500'
  },
  {
    id: 'creative' as StudioType,
    title: 'Creative Writing',
    description: 'Stories, scripts, and creative content',
    icon: Feather,
    tier: 'Popular',
    tierColor: 'bg-orange-100 text-orange-700',
    usage: 60,
    usageLimit: 90,
    color: 'from-orange-500 to-red-500'
  }
];

export function EnhancedSidebar({ 
  currentStudio, 
  onStudioChange, 
  isCollapsed = false, 
  onToggleCollapse 
}: EnhancedSidebarProps) {
  const [hoveredStudio, setHoveredStudio] = useState<StudioType | null>(null);

  return (
    <motion.div
      className={`relative bg-white/90 backdrop-blur-xl border-r border-gray-200/60 shadow-xl transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-80'
      }`}
      animate={{ width: isCollapsed ? 80 : 320 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header with collapse toggle */}
        <div className="p-6 border-b border-gray-200/60">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-black text-gray-900">AI Studios</h2>
                <p className="text-sm text-gray-600">Choose your creative workspace</p>
              </motion.div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="p-2 rounded-xl hover:bg-orange-50 transition-colors"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Studio List */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {studioConfigs.map((studio) => {
            const Icon = studio.icon;
            const isActive = currentStudio === studio.id;
            const isHovered = hoveredStudio === studio.id;

            return (
              <motion.div
                key={studio.id}
                onMouseEnter={() => setHoveredStudio(studio.id)}
                onMouseLeave={() => setHoveredStudio(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onStudioChange(studio.id)}
                  className={`w-full p-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? `bg-gradient-to-r ${studio.color} text-white shadow-lg`
                      : 'bg-white/50 hover:bg-white/80 text-gray-700 hover:text-gray-900 border border-gray-200/60 hover:border-orange-200'
                  }`}
                >
                  {/* Background pattern for active state */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  )}
                  
                  <div className="relative z-10 flex items-center space-x-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-white/20' 
                        : `bg-gradient-to-br ${studio.color} text-white`
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          className="flex-1 text-left"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-sm">{studio.title}</h3>
                            <Badge className={`text-xs px-2 py-1 ${studio.tierColor} border-0`}>
                              {studio.tier}
                            </Badge>
                          </div>
                          <p className={`text-xs mb-3 ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
                            {studio.description}
                          </p>
                          
                          {/* Usage indicator */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className={isActive ? 'text-white/80' : 'text-gray-500'}>
                                Usage
                              </span>
                              <span className={`font-bold ${isActive ? 'text-white' : 'text-gray-700'}`}>
                                {studio.usage}/{studio.usageLimit}
                              </span>
                            </div>
                            <Progress 
                              value={(studio.usage / studio.usageLimit) * 100} 
                              className={`h-2 ${isActive ? 'bg-white/20' : 'bg-gray-200'}`}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Visual indicators */}
                    {isActive && (
                      <motion.div
                        className="w-1 h-8 bg-white rounded-full"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer with upgrade prompt */}
        {!isCollapsed && (
          <motion.div
            className="p-4 border-t border-gray-200/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-2xl border border-orange-200/60">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Upgrade to Pro</h4>
                  <p className="text-xs text-gray-600">Unlock unlimited usage</p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl"
              >
                <Zap className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}