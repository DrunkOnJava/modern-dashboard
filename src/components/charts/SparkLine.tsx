import React from 'react';

interface SparkLineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export function SparkLine({
  data,
  width = 100,
  height = 30,
  color = '#3B82F6',
  strokeWidth = 1.5,
  className = ''
}: SparkLineProps) {
  if (!data.length) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  const points = data.map((value, i) => ({
    x: (i * width) / (data.length - 1),
    y: height - ((value - min) * height) / range
  }));

  const path = points
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <svg width={width} height={height} className={className}>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        className="transition-all duration-300"
      />
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={2}
        fill={color}
      />
    </svg>
  );
}