import React, { useMemo } from 'react';
import classNames from 'classnames';

import {
  getVariationKey,
  VARIATION_COLORS,
} from '../../entities/variation/model/constants';
import { VariationButton } from '../../entities/variation/ui/VariationButton/VariationButton';
import type { VariationData } from '../../shared/types';
import { Dropdown } from '../../shared/ui/Dropdown/Dropdown';

import styles from './VariationSelector.module.scss';

interface VariationSelectorProps {
  variations: VariationData[];
  selectedVariations: Set<string>;
  onToggle: (key: string) => void;
  className?: string;
}

export const VariationSelector: React.FC<VariationSelectorProps> = ({
  variations,
  selectedVariations,
  onToggle,
  className,
}) => {
  const dropdownLabel = useMemo(() => {
    const count = selectedVariations.size;
    if (count === variations.length) {
      return 'All variations selected';
    }
    if (count === 1) {
      const selectedKey = Array.from(selectedVariations)[0];
      const variation = variations.find(
        (v) => getVariationKey(v) === selectedKey
      );
      return variation?.name || '1 variation selected';
    }
    return `${count} variations selected`;
  }, [selectedVariations, variations]);

  return (
    <div className={classNames(styles.container, className)}>
      <Dropdown label={dropdownLabel}>
        <div className={styles.variationList}>
          {variations.map((variation) => {
            const key = getVariationKey(variation);
            const isSelected = selectedVariations.has(key);
            const color = VARIATION_COLORS[key];

            return (
              <VariationButton
                key={key}
                name={variation.name}
                color={color}
                isSelected={isSelected}
                onClick={() => onToggle(key)}
                disabled={isSelected && selectedVariations.size === 1}
              />
            );
          })}
        </div>
      </Dropdown>
    </div>
  );
};
