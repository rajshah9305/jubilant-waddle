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
      className={`bg-gradient-to-br from-white via-white to-orange-50/30 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-200/60 cursor-pointer h-full flex flex-col relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 ${className || ''}`}
      onClick={onClick}
      whileHover={{ 
        y: -15, 
        boxShadow: "0 35px 70px rgba(255, 140, 0, 0.25)",
        scale: 1.03
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", damping: 20 }}
    >
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Animated glowing border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" style={{ padding: '3px' }}>
        <div className="w-full h-full bg-white rounded-3xl"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center mb-8">
        <motion.div 
          className="w-24 h-24 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-orange-500/35 group-hover:shadow-2xl"
          whileHover={{ rotate: 15, scale: 1.15 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
        >
          <Icon className="w-12 h-12 text-white" />
        </motion.div>
        <h3 className="text-2xl lg:text-3xl font-black text-gray-900 group-hover:text-orange-600 transition-colors duration-300 mb-2">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-8 leading-relaxed flex-1 text-center relative z-10 text-base lg:text-lg font-medium">{description}</p>
      
      {/* Enhanced tags section with consistent layout */}
      <div className="grid grid-cols-1 gap-3 relative z-10">
        {tags.map((tag, index) => (
          <motion.div
            key={tag}
            className="px-5 py-3 bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 text-orange-800 rounded-2xl text-center font-bold border-2 border-orange-200/60 group-hover:bg-gradient-to-r group-hover:from-orange-200 group-hover:via-orange-100 group-hover:to-orange-200 group-hover:border-orange-300 transition-all duration-400 shadow-lg group-hover:shadow-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {tag}
          </motion.div>
        ))}
      </div>
      
      {/* Enhanced hover effect overlay */}
      <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-3xl"></div>
      
      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
}
