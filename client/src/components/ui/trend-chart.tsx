import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendChartProps {
  data: number[];
  color?: string;
  height?: number;
  showTrend?: boolean;
  animate?: boolean;
}

export function TrendChart({ 
  data, 
  color = '#3b82f6', 
  height = 60, 
  showTrend = false,
  animate = true 
}: TrendChartProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!data || data.length < 2) {
    return (
      <div 
        className="w-full bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm"
        style={{ height }}
      >
        No data
      </div>
    );
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const trend = data[data.length - 1] - data[0];
  const trendPercentage = ((trend / data[0]) * 100).toFixed(1);

  return (
    <div 
      className="relative w-full"
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        {/* Background area */}
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>
        
        {/* Area under the curve */}
        <motion.path
          d={`M 0,100 L ${points} L 100,100 Z`}
          fill={`url(#gradient-${color})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: animate ? 1 : 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Main trend line */}
        <motion.polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={isHovered ? "3" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: animate ? 1 : 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ filter: isHovered ? `drop-shadow(0 0 4px ${color}40)` : 'none' }}
        />

        {/* Data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((value - min) / range) * 100;
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r={isHovered ? "2" : "1.5"}
              fill={color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Trend indicator */}
      {showTrend && (
        <div className="absolute top-1 right-1 flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded px-2 py-1">
          {trend >= 0 ? (
            <TrendingUp className="w-3 h-3 text-green-500" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-500" />
          )}
          <span className={`text-xs font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? '+' : ''}{trendPercentage}%
          </span>
        </div>
      )}

      {/* Hover tooltip */}
      {isHovered && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
          {data.length} data points
        </div>
      )}
    </div>
  );
}