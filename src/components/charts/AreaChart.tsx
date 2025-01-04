import React from 'react';

interface DataPoint {
  x: string | number;
  y: number;
}

interface AreaChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  fillOpacity?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  className?: string;
}

export function AreaChart({
  data,
  width = 300,
  height = 200,
  color = '#3B82F6',
  fillOpacity = 0.2,
  showGrid = true,
  showLabels = true,
  className = ''
}: AreaChartProps) {
  if (!data.length) return null;

  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const xValues = data.map(d => d.x);
  const yValues = data.map(d => d.y);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  const getX = (x: number) => (x * chartWidth) / (data.length - 1) + padding;
  const getY = (y: number) => chartHeight - ((y - minY) * chartHeight) / (maxY - minY) + padding;

  const points = data.map((d, i) => ({
    x: getX(i),
    y: getY(d.y)
  }));

  const linePath = points
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <svg width={width} height={height} className={className}>
      {/* Grid */}
      {showGrid && (
        <g className="text-gray-200 dark:text-gray-700">
          {Array.from({ length: 5 }).map((_, i) => {
            const y = padding + (i * chartHeight) / 4;
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="currentColor"
                strokeDasharray="4,4"
              />
            );
          })}
          {Array.from({ length: 5 }).map((_, i) => {
            const x = padding + (i * chartWidth) / 4;
            return (
              <line
                key={i}
                x1={x}
                y1={padding}
                x2={x}
                y2={height - padding}
                stroke="currentColor"
                strokeDasharray="4,4"
              />
            );
          })}
        </g>
      )}

      {/* Area */}
      <path
        d={areaPath}
        fill={color}
        fillOpacity={fillOpacity}
        className="transition-all duration-300"
      />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
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
      {showLabels && (
        <g className="text-xs text-gray-500 dark:text-gray-400">
          {data.map((d, i) => (
            <text
              key={i}
              x={getX(i)}
              y={height - 5}
              textAnchor="middle"
            >
              {d.x}
            </text>
          ))}
          {Array.from({ length: 5 }).map((_, i) => {
            const value = minY + ((maxY - minY) * i) / 4;
            return (
              <text
                key={i}
                x={padding - 5}
                y={getY(value)}
                textAnchor="end"
                dominantBaseline="middle"
              >
                {value.toFixed(1)}
              </text>
            );
          })}
        </g>
      )}
    </svg>
  );
}