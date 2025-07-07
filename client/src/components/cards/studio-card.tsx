import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { StudioType } from '@/types/studio';

interface StudioCardProps {
  id: StudioType;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  className?: string;
  onClick: () => void;
}

export function StudioCard({
  title,
  description,
  icon: Icon,
  tags,
  className,
  onClick,
}: StudioCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl p-8 border border-gray-200 cursor-pointer hover-lift ${className || ''}`}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 ml-4">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
