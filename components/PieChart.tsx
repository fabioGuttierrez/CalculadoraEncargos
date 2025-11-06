
import React from 'react';

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  if (total === 0) return null;

  const slices = data.map(slice => {
    const percent = slice.value / total;
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
    cumulativePercent += percent;
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    const pathData = [
      `M ${startX} ${startY}`, // Move
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
      `L 0 0`, // Line
    ].join(' ');

    return <path key={slice.label} d={pathData} fill={slice.color}></path>;
  });


  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="w-32 h-32">
        <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
          {slices}
        </svg>
      </div>
      <div className="flex-1 space-y-2 text-sm">
        {data.map(item => (
            <div key={item.label} className="flex justify-between items-center">
                <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                    <span className="text-gray-300">{item.label}</span>
                </div>
                <span className="font-semibold text-white">{formatCurrency(item.value)}</span>
            </div>
        ))}
      </div>
    </div>
  );
};
