import React, { useState, useMemo } from 'react';

import classNames from 'classnames';

import { ChartRenderer } from '../ChartRenderer/ChartRenderer';
import { Controls } from '../Controls/Controls';
import { ThemeToggle } from '../../features/ThemeToggle/ThemeToggle';
import { useTheme } from '../../shared/hooks/useTheme';
import { useVariations } from '../../shared/hooks/useVariations';
import { useZoom } from '../../shared/hooks/useZoom';
import type { ChartData, DateRange, LineStyle } from '../../shared/types';
import {
  aggregateByWeek,
  processChartData,
} from '../../shared/utils/dataProcessing';

import styles from './TestChart.module.scss';

interface TestChartProps {
  data: ChartData;
}

export const TestChart: React.FC<TestChartProps> = ({ data }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { selectedVariations, toggleVariation } = useVariations([
    '0',
    '10001',
    '10002',
    '10003',
  ]);
  const [dateRange, setDateRange] = useState<DateRange>('Day');
  const [lineStyle, setLineStyle] = useState<LineStyle>('Smooth');

  const processedData = useMemo(() => {
    const rawData =
      dateRange === 'Week' ? aggregateByWeek(data.data) : data.data;
    return processChartData(rawData, data.variations, selectedVariations);
  }, [dateRange, selectedVariations, data]);

  const {
    startIndex,
    endIndex,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    canZoomInValue,
    canZoomOutValue,
  } = useZoom({ dataLength: processedData.length });

  const displayData = useMemo(() => {
    return processedData.slice(startIndex, endIndex + 1);
  }, [processedData, startIndex, endIndex]);

  return (
    <div className={classNames(styles.wrapper, { [styles.dark]: isDark })}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>A/B Test Conversion Rate</h1>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>

        <Controls
          variations={data.variations}
          selectedVariations={selectedVariations}
          onToggleVariation={toggleVariation}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          lineStyle={lineStyle}
          onLineStyleChange={setLineStyle}
          theme={theme}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          canZoomIn={canZoomInValue}
          canZoomOut={canZoomOutValue}
        />

        <ChartRenderer
          data={displayData}
          variations={data.variations}
          selectedVariations={selectedVariations}
          lineStyle={lineStyle}
          theme={theme}
        />
      </div>
    </div>
  );
};
