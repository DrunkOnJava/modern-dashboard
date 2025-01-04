import React from 'react';

interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  size?: number;
  thickness?: number;
  color?: string;
  backgroundColor?: string;
  showValue?: boolean;
  className?: string;
}

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  size = 200,
  thickness = 20,
  color = '#3B82F6',
  backgroundColor = '#E5E7EB',
  showValue = true,
  className = ''
}: GaugeChartProps) {
  const center = size / 2;
  const radius = (size - thickness) / 2;
  const startAngle = -Math.PI * 0.75;
  const endAngle = Math.PI * 0.75;
  const angleRange = endAngle - startAngle;
  const valueScale = (value - min) / (max - min);
  const valueAngle = startAngle + angleRange * valueScale;

  const getArcPath = (start: number, end: number) => {
    const largeArc = end - start > Math.PI ? 1 : 0;
    const startX = center + Math.cos(start) * radius;
    const startY = center + Math.sin(start) * radius;
    const endX = center + Math.cos(end) * radius;
    const endY = center + Math.sin(end) * radius;

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`;
  };

  return (
    <svg width={size} height={size} className={className}>
      {/* Background arc */}
      <path
        d={getArcPath(startAngle, endAngle)}
        fill="none"
        stroke={backgroundColor}
        strokeWidth={thickness}
        strokeLinecap="round"
      />

      {/* Value arc */}
      <path
        d={getArcPath(startAngle, valueAngle)}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        className="transition-all duration-300"
      />

      {/* Value text */}
      {showValue && (
        <text
          x={center}
          y={center + size / 4}
          textAnchor="middle"
          className="text-2xl font-bold text-gray-700 dark:text-gray-300"
        >
          {Math.round(value)}
        </text>
      )}

      {/* Min/Max labels */}
      <text
        x={size * 0.15}
        y={size * 0.85}
        className="text-sm text-gray-500 dark:text-gray-400"
      >
        {min}
      </text>
      <text
        x={size * 0.85}
        y={size * 0.85}
        textAnchor="end"
        className="text-sm text-gray-500 dark:text-gray-400"
      >
        {max}
      </text>
    </svg>
  );
}