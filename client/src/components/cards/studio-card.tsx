import { motion } from 'framer-motion';
import { LucideIcon, ArrowUpRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StudioCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
  index: number;
  badge?: string;
}

export function StudioCard({ 
  title, 
  description, 
  icon: Icon, 
  gradient, 
  onClick, 
  index,
  badge 
}: StudioCardProps) {
  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -12,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      onClick={onClick}
    >
      {/* Main Card Container with Glass Morphism */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 group-hover:shadow-3xl">
        {/* Dynamic Background Gradients */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-all duration-700`} />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/40 to-transparent rounded-3xl blur-2xl"></div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-60"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3
          }}
        />

        {/* Premium Badge */}
        {badge && (
          <motion.div 
            className="absolute top-6 right-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-3 py-1 shadow-lg">
              {badge}
            </Badge>
          </motion.div>
        )}

        {/* Enhanced Icon Container */}
        <motion.div 
          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-xl transition-all duration-500`}
          whileHover={{ 
            rotate: [0, -5, 5, 0],
            scale: 1.1
          }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-10 h-10 text-white relative z-10" />

          {/* Icon Glow Effect */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>

          {/* Sparkle Effect */}
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles className="w-4 h-4 text-white/80" />
          </motion.div>
        </motion.div>

        {/* Enhanced Content */}
        <div className="relative z-10 space-y-4">
          <motion.h3 
            className="text-2xl font-black text-gray-900 group-hover:text-gray-800 transition-colors duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
          >
            {title}
          </motion.h3>

          <motion.p 
            className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
          >
            {description}
          </motion.p>

          {/* Enhanced CTA */}
          <motion.div
            className="flex items-center space-x-2 text-sm font-bold text-gray-500 group-hover:text-orange-600 transition-all duration-300 pt-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
          >
            <span>Explore Studio</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>

        {/* Premium Hover Border Effect */}
        <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-30 transition-all duration-700`} 
             style={{ 
               mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
               maskComposite: 'xor'
             }} 
        />

        {/* Bottom Glow Effect */}
        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r ${gradient} blur-sm opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
      </div>
    </motion.div>
  );
}