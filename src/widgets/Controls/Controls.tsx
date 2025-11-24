import React from 'react';

import classNames from 'classnames';

import { DateRangeSelector } from '../../features/DateRangeSelector/DateRangeSelector';
import { ExportButton } from '../../features/ExportButton/ExportButton';
import { LineStyleSelector } from '../../features/LineStyleSelector/LineStyleSelector';
import { VariationSelector } from '../../features/VariationSelector/VariationSelector';
import { ZoomControls } from '../../features/ZoomControls/ZoomControls';
import type {
  VariationData,
  DateRange,
  LineStyle,
  Theme,
} from '../../shared/types';

import styles from './Controls.module.scss';

interface ControlsProps {
  variations: VariationData[];
  selectedVariations: Set<string>;
  onToggleVariation: (key: string) => void;

  dateRange: DateRange;
  onDateRangeChange: (value: DateRange) => void;

  lineStyle: LineStyle;
  onLineStyleChange: (value: LineStyle) => void;

  theme: Theme;

  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;

  className?: string;
}

export const Controls: React.FC<ControlsProps> = ({
  variations,
  selectedVariations,
  onToggleVariation,
  dateRange,
  onDateRangeChange,
  lineStyle,
  onLineStyleChange,
  theme,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  canZoomIn,
  canZoomOut,
  className,
}) => {
  return (
    <div className={classNames(styles.controls, className)}>
      <div className={styles.leftSelectors}>
        <VariationSelector
          variations={variations}
          selectedVariations={selectedVariations}
          onToggle={onToggleVariation}
        />
        <DateRangeSelector value={dateRange} onChange={onDateRangeChange} />
      </div>
      <div className={styles.rightSelectors}>
        <LineStyleSelector value={lineStyle} onChange={onLineStyleChange} />
        <ExportButton theme={theme} />
        <ZoomControls
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onReset={onResetZoom}
          canZoomIn={canZoomIn}
          canZoomOut={canZoomOut}
        />
      </div>
    </div>
  );
};
