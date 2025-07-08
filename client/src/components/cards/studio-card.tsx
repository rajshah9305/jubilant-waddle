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
      className={`bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-200/50 cursor-pointer h-full flex flex-col relative overflow-hidden group ${className || ''}`}
      onClick={onClick}
      whileHover={{ 
        y: -12, 
        boxShadow: "0 25px 50px rgba(255, 140, 0, 0.2)",
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", damping: 20 }}
    >
      {/* Premium background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px' }}>
        <div className="w-full h-full bg-white rounded-3xl"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center mb-8">
        <motion.div 
          className="w-20 h-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-orange-500/25"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-2xl font-black text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-8 leading-relaxed flex-1 text-center relative z-10 text-lg">{description}</p>
      
      <div className="flex flex-wrap gap-3 justify-center relative z-10">
        {tags.map((tag, index) => (
          <motion.span
            key={tag}
            className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 rounded-full text-sm font-bold border border-orange-200 group-hover:bg-gradient-to-r group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </motion.div>
  );
}
