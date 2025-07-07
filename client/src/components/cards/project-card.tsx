import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Project } from '@/types/studio';

interface ProjectCardProps {
  project: Project;
  icon: LucideIcon;
  onClick: () => void;
}

export function ProjectCard({ project, icon: Icon, onClick }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 border border-gray-200 hover-lift cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900">{project.title}</h3>
          <p className="text-sm text-gray-500 capitalize">{project.studioType} Generation</p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">
        {project.content.substring(0, 100)}...
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{formatDistanceToNow(new Date(project.createdAt))} ago</span>
        <span>{project.tokensUsed} tokens</span>
      </div>
    </motion.div>
  );
}
