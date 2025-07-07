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
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/">
          <Button variant="ghost" className="mb-4 p-0 h-auto text-gray-600 hover:text-primary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <h2 className="text-xl font-extrabold text-gray-900">
          {studioConfig[currentStudio].title}
        </h2>
      </div>

      {/* Studio Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {Object.entries(studioConfig).map(([key, config]) => {
          const Icon = config.icon;
          const isActive = key === currentStudio;
          
          return (
            <Button
              key={key}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-3 ${
                isActive 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onStudioChange(key as StudioType)}
            >
              <Icon className="w-5 h-5 mr-3" />
              {config.title}
            </Button>
          );
        })}
      </nav>

      {/* Recent Projects */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Recent Projects
        </h3>
        <div className="space-y-2">
          <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <div className="text-sm font-semibold text-gray-900">Blog Post Draft</div>
            <div className="text-xs text-gray-500">2 hours ago</div>
          </div>
          <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <div className="text-sm font-semibold text-gray-900">API Documentation</div>
            <div className="text-xs text-gray-500">1 day ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
