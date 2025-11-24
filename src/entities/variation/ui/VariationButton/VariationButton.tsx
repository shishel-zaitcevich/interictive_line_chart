import React from 'react';
import classNames from 'classnames';

import styles from './VariationButton.module.scss';

interface VariationButtonProps {
  name: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const VariationButton: React.FC<VariationButtonProps> = ({
  name,
  color,
  isSelected,
  onClick,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(styles.button, {
        [styles.selected]: isSelected,
        [styles.disabled]: disabled
      })}
      style={{
        borderColor: isSelected ? color : `${color}40`,
        backgroundColor: isSelected ? `${color}20` : '#FFF',
        color: isSelected ? color : `${color}70`
      }}
    >
      <span className={styles.indicator} style={{ backgroundColor: color }} />
      {name}
    </button>
  );
};
