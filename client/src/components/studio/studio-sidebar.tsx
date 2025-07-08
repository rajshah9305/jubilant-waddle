import React from 'react';
import { ArrowLeft, PenTool, Code, FileText, Feather } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { StudioType } from '@/types/studio';

interface StudioSidebarProps {
  currentStudio: StudioType;
  onStudioChange: (studio: StudioType) => void;
}

const studioConfig = {
  text: { icon: PenTool, title: 'Text Generation' },
  code: { icon: Code, title: 'Code Generation' },
  document: { icon: FileText, title: 'Document AI' },
  creative: { icon: Feather, title: 'Creative Writing' },
};

export function StudioSidebar({ currentStudio, onStudioChange }: StudioSidebarProps) {
  const enhancedStudioConfig = {
    text: { ...studioConfig.text, description: 'Generate compelling content and copy', status: 'Popular' },
    code: { ...studioConfig.code, description: 'Create and optimize code efficiently', status: 'Enhanced' },
    document: { ...studioConfig.document, description: 'Analyze and process documents', status: 'Pro' },
    creative: { ...studioConfig.creative, description: 'Craft stories and creative content', status: 'Premium' },
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-white via-gray-50/30 to-white flex flex-col relative overflow-hidden">
      {/* Enterprise background pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Enhanced header */}
      <div className="p-8 border-b border-gray-200/60 backdrop-blur-sm relative z-10">
        <Link href="/">
          <Button variant="ghost" className="mb-6 p-0 h-auto text-gray-600 hover:text-orange-600 transition-colors duration-300 group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Back to Dashboard</span>
          </Button>
        </Link>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
            {React.createElement(enhancedStudioConfig[currentStudio].icon, { className: "w-5 h-5 text-white" })}
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 leading-tight">
              {enhancedStudioConfig[currentStudio].title}
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              {enhancedStudioConfig[currentStudio].description}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced studio navigation */}
      <nav className="flex-1 p-6 space-y-3 relative z-10">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
          AI Studios
        </h3>
        {Object.entries(enhancedStudioConfig).map(([key, config]) => {
          const Icon = config.icon;
          const isActive = key === currentStudio;
          
          return (
            <div
              key={key}
              className={`group cursor-pointer transition-all duration-300 ${
                isActive ? 'translate-x-2' : 'hover:translate-x-1'
              }`}
              onClick={() => onStudioChange(key as StudioType)}
            >
              <div className={`
                relative p-4 rounded-2xl border-2 transition-all duration-500 backdrop-blur-sm
                ${isActive 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/25 border-orange-300' 
                  : 'bg-white/60 hover:bg-white/80 text-gray-700 border-gray-200/60 hover:border-orange-200 hover:shadow-lg'
                }
              `}>
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isActive 
                      ? 'bg-white/20 shadow-lg' 
                      : 'bg-orange-50 group-hover:bg-orange-100 group-hover:scale-105'
                    }
                  `}>
                    <Icon className={`w-6 h-6 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-orange-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-bold text-base transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-900'
                      }`}>
                        {config.title}
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full transition-colors duration-300 ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {config.status}
                      </span>
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isActive ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {config.description}
                    </div>
                  </div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Enhanced recent projects */}
      <div className="p-6 border-t border-gray-200/60 backdrop-blur-sm relative z-10">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
          Recent Projects
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-white/60 hover:bg-white/80 rounded-xl cursor-pointer transition-all duration-300 border border-gray-200/60 hover:border-orange-200 hover:shadow-md group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                  Blog Post Draft
                </div>
                <div className="text-xs text-gray-500">2 hours ago • Text Studio</div>
              </div>
              <div className="w-8 h-8 bg-orange-50 group-hover:bg-orange-100 rounded-lg flex items-center justify-center transition-colors">
                <PenTool className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="p-4 bg-white/60 hover:bg-white/80 rounded-xl cursor-pointer transition-all duration-300 border border-gray-200/60 hover:border-orange-200 hover:shadow-md group">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                  API Documentation
                </div>
                <div className="text-xs text-gray-500">1 day ago • Code Studio</div>
              </div>
              <div className="w-8 h-8 bg-green-50 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                <Code className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
