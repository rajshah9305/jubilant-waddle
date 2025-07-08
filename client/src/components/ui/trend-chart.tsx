import { motion } from 'framer-motion';

interface TrendChartProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}

export function TrendChart({ data, color = '#f97316', height = 40, width = 100 }: TrendChartProps) {
  if (data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex items-center justify-center">
      <svg width={width} height={height} className="overflow-visible">
        <motion.polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        {/* Data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * width;
          const y = height - ((value - min) / range) * height;
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            />
          );
        })}
      </svg>
    </div>
  );
}