import React from 'react';
import classNames from 'classnames';

import type { Theme } from '../../shared/types';
import { CalendarIcon } from '../../shared/ui/icons/CalendarIcon';
import { TrophyIcon } from '../../shared/ui/icons/TrophyIcon';

import styles from './CustomTooltip.module.scss';

interface TooltipPayloadEntry {
  name: string;
  value: number;
  color: string;
  dataKey: string;
  payload: Record<string, unknown>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
  theme: Theme;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  theme,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  const isDark = theme === 'dark';

  const sortedPayload = [...payload].sort((a, b) => b.value - a.value);

  const maxValue = sortedPayload[0]?.value;

  return (
    <div className={classNames(styles.tooltip, { [styles.dark]: isDark })}>
      <div className={styles.header}>
        <CalendarIcon className={styles.calendarIcon} />
        <span className={styles.date}>
          {new Date(label || '').toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </span>
      </div>

      <div className={styles.divider} />

      <div className={styles.entries}>
        {sortedPayload.map((entry: TooltipPayloadEntry, index: number) => {
          const isWinner = entry.value === maxValue;

          return (
            <div key={`${entry.dataKey}-${index}`} className={styles.entry}>
              <div
                className={styles.indicator}
                style={{ backgroundColor: entry.color }}
              />
              <span className={styles.name}>{entry.name}</span>
              {isWinner && <TrophyIcon />}
              <span className={styles.value}>{entry.value.toFixed(2)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
