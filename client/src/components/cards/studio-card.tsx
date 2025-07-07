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
      className={`bg-white rounded-xl p-8 border border-gray-200 cursor-pointer hover-lift h-full flex flex-col ${className || ''}`}
      onClick={onClick}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(255, 140, 0, 0.15)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-extrabold text-gray-900">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-6 leading-relaxed flex-1 text-center">{description}</p>
      
      <div className="flex flex-wrap gap-2 justify-center">
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
