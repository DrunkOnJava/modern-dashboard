import React from 'react';

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: DataPoint[];
  size?: number;
  donut?: boolean;
  showLabels?: boolean;
  className?: string;
}

export function PieChart({
  data,
  size = 200,
  donut = false,
  showLabels = true,
  className = ''
}: PieChartProps) {
  if (!data.length) return null;

  const radius = size / 2;
  const center = size / 2;
  const donutRadius = radius * 0.6;

  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;

  const segments = data.map(d => {
    const angle = (d.value / total) * 2 * Math.PI;
    const segment = {
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      value: d.value,
      color: d.color,
      label: d.label
    };
    currentAngle += angle;
    return segment;
  });

  const getPath = (startAngle: number, endAngle: number, outerRadius: number, innerRadius = 0) => {
    const start = {
      x: center + Math.cos(startAngle) * outerRadius,
      y: center + Math.sin(startAngle) * outerRadius
    };
    const end = {
      x: center + Math.cos(endAngle) * outerRadius,
      y: center + Math.sin(endAngle) * outerRadius
    };
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    if (innerRadius === 0) {
      return `M ${start.x} ${start.y}
        A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${end.x} ${end.y}
        L ${center} ${center}
        Z`;
    }

    const innerStart = {
      x: center + Math.cos(startAngle) * innerRadius,
      y: center + Math.sin(startAngle) * innerRadius
    };
    const innerEnd = {
      x: center + Math.cos(endAngle) * innerRadius,
      y: center + Math.sin(endAngle) * innerRadius
    };

    return `M ${start.x} ${start.y}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${end.x} ${end.y}
      L ${innerEnd.x} ${innerEnd.y}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}
      Z`;
  };

  return (
    <svg width={size} height={size} className={className}>
      {/* Segments */}
      {segments.map((segment, i) => (
        <path
          key={i}
          d={getPath(
            segment.startAngle - Math.PI / 2,
            segment.endAngle - Math.PI / 2,
            radius,
            donut ? donutRadius : 0
          )}
          fill={segment.color}
          className="transition-all duration-300"
        />
      ))}

      {/* Labels */}
      {showLabels && segments.map((segment, i) => {
        const midAngle = (segment.startAngle + segment.endAngle) / 2 - Math.PI / 2;
        const labelRadius = radius * 1.2;
        const x = center + Math.cos(midAngle) * labelRadius;
        const y = center + Math.sin(midAngle) * labelRadius;
        const anchor = x > center ? 'start' : 'end';

        return (
          <g key={i}>
            <line
              x1={center + Math.cos(midAngle) * radius}
              y1={center + Math.sin(midAngle) * radius}
              x2={x}
              y2={y}
              stroke={segment.color}
              strokeWidth={1}
            />
            <text
              x={x}
              y={y}
              dy=".35em"
              textAnchor={anchor}
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              {segment.label} ({((segment.value / total) * 100).toFixed(1)}%)
            </text>
          </g>
        );
      })}
    </svg>
  );
}