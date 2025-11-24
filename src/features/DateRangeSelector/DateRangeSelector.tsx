import React from 'react';
import classNames from 'classnames';

import type { DateRange } from '../../shared/types';
import { Dropdown } from '../../shared/ui/Dropdown/Dropdown';

import styles from './DateRangeSelector.module.scss';

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
  className?: string;
}

const OPTIONS = [
  { value: 'Day', label: 'Day' },
  { value: 'Week', label: 'Week' },
];

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <Dropdown
        label="Day"
        options={OPTIONS}
        value={value}
        onChange={(v) => onChange(v as DateRange)}
      />
    </div>
  );
};
