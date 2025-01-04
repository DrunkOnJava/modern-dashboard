import React from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface RadarChartProps {
  data: DataPoint[];
  size?: number;
  color?: string;
  fillOpacity?: number;
  showLabels?: boolean;
  className?: string;
}

export function RadarChart({
  data,
  size = 300,
  color = '#3B82F6',
  fillOpacity = 0.2,
  showLabels = true,
  className = ''
}: RadarChartProps) {
  if (!data.length) return null;

  const center = size / 2;
  const radius = (size - 40) / 2;
  const angleStep = (2 * Math.PI) / data.length;

  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const distance = (d.value / maxValue) * radius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
      label: d.label,
      value: d.value
    };
  });

  const shapePath = points
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ') + ' Z';

  const getAxisPoint = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: center + Math.cos(angle) * value,
      y: center + Math.sin(angle) * value
    };
  };

  return (
    <svg width={size} height={size} className={className}>
      {/* Background grid */}
      <g className="text-gray-200 dark:text-gray-700">
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => {
          const gridPoints = data.map((_, j) => getAxisPoint(j, radius * scale));
          const gridPath = gridPoints
            .map((point, j) => `${j === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
            .join(' ') + ' Z';
          return (
            <path
              key={i}
              d={gridPath}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeDasharray="4,4"
            />
          );
        })}
      </g>

      {/* Axes */}
      {data.map((_, i) => {
        const point = getAxisPoint(i, radius);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700"
          />
        );
      })}

      {/* Data shape */}
      <path
        d={shapePath}
        fill={color}
        fillOpacity={fillOpacity}
        stroke={color}
        strokeWidth={2}
        className="transition-all duration-300"
      />

      {/* Points */}
      {points.map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r={3}
          fill={color}
          className="transition-all duration-300"
        />
      ))}

      {/* Labels */}
      {showLabels && points.map((point, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelDistance = radius + 20;
        const labelX = center + Math.cos(angle) * labelDistance;
        const labelY = center + Math.sin(angle) * labelDistance;
        const anchor = Math.abs(angle) < Math.PI / 2 ? 'start' : 'end';

        return (
          <text
            key={i}
            x={labelX}
            y={labelY}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {point.label}
          </text>
        );
      })}
    </svg>
  );
}