import React from 'react';
import classNames from 'classnames';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

import { CustomTooltip } from '../CustomTooltip/CustomTooltip';
import {
  getVariationKey,
  VARIATION_COLORS,
} from '../../entities/variation/model/constants';
import type {
  ChartDataPoint,
  VariationData,
  LineStyle,
  Theme,
} from '../../shared/types';

import styles from './ChartRenderer.module.scss';

interface ChartRendererProps {
  data: ChartDataPoint[];
  variations: VariationData[];
  selectedVariations: Set<string>;
  lineStyle: LineStyle;
  theme: Theme;
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({
  data,
  variations,
  selectedVariations,
  lineStyle,
  theme,
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';
  const gridColor = isDark ? 'transparent' : '#e2e8f0';

  const ChartComponent = lineStyle === 'Area' ? AreaChart : LineChart;

  const getLineType = (): 'monotone' | 'linear' => {
    switch (lineStyle) {
      case 'Smooth':
        return 'monotone';
      default:
        return 'linear';
    }
  };

  return (
    <div className={classNames(styles.container, { [styles.dark]: isDark })}>
      <ResponsiveContainer width="100%" height={500}>
        <ChartComponent
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="date"
            stroke={textColor}
            tick={{ fill: textColor }}
            tickFormatter={(value: string) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });
            }}
          />
          <YAxis
            stroke={textColor}
            tick={{ fill: textColor }}
            tickFormatter={(value: number) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip theme={theme} />} />
          <Legend />

          {variations.map((variation) => {
            const key = getVariationKey(variation);
            if (!selectedVariations.has(key)) return null;

            const color = VARIATION_COLORS[key];

            if (lineStyle === 'Area') {
              return (
                <Area
                  key={variation.name}
                  type="monotone"
                  dataKey={variation.name}
                  stroke={color}
                  fill={color}
                  fillOpacity={0.3}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
              );
            }

            return (
              <Line
                key={variation.name}
                type={getLineType()}
                dataKey={variation.name}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            );
          })}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};
