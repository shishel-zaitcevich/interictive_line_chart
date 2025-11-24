import React from 'react';
import classNames from 'classnames';

import type { LineStyle } from '../../shared/types';
import { Dropdown } from '../../shared/ui/Dropdown/Dropdown';

import styles from './LineStyleSelector.module.scss';

interface LineStyleSelectorProps {
  value: LineStyle;
  onChange: (value: LineStyle) => void;
  className?: string;
}

const OPTIONS = [
  { value: 'Line', label: 'Line style: line' },
  { value: 'Smooth', label: 'Line style: smooth' },
  { value: 'Area', label: 'Line style: area' },
];

export const LineStyleSelector: React.FC<LineStyleSelectorProps> = ({
  className,
  value,
  onChange,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <Dropdown
        label="Smooth"
        options={OPTIONS}
        value={value}
        onChange={(v) => onChange(v as LineStyle)}
      />
    </div>
  );
};
