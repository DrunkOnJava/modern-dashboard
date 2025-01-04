import React from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  showValues?: boolean;
  className?: string;
}

export function BarChart({
  data,
  width = 300,
  height = 200,
  color = '#3B82F6',
  showValues = true,
  className = ''
}: BarChartProps) {
  if (!data.length) return null;

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = (chartWidth / data.length) * 0.8;
  const barGap = (chartWidth / data.length) * 0.2;

  const maxValue = Math.max(...data.map(d => d.value));
  const getBarHeight = (value: number) => (value / maxValue) * chartHeight;

  return (
    <svg width={width} height={height} className={className}>
      {/* Bars */}
      {data.map((d, i) => {
        const barHeight = getBarHeight(d.value);
        const x = padding + i * (barWidth + barGap);
        const y = height - padding - barHeight;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              className="transition-all duration-300"
            />
            {/* Bar value */}
            {showValues && (
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                {d.value}
              </text>
            )}
            {/* Bar label */}
            <text
              x={x + barWidth / 2}
              y={height - padding + 15}
              textAnchor="middle"
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              {d.label}
            </text>
          </g>
        );
      })}

      {/* Y-axis */}
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="currentColor"
        className="text-gray-300 dark:text-gray-600"
      />

      {/* X-axis */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="currentColor"
        className="text-gray-300 dark:text-gray-600"
      />
    </svg>
  );
}