import React from 'react';
import classNames from 'classnames';

import { Button } from '../../shared/ui/Button/Button';
import { ResetIcon } from '../../shared/ui/icons/ResetIcon';

import { MinusIcon } from '../../shared/ui/icons/MinusIcon';
import { PlusIcon } from '../../shared/ui/icons/PlusIcon';

import styles from './ZoomControls.module.scss';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
  className?: string;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  canZoomIn,
  canZoomOut,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.zoomBtns}>
        <Button
          variant="icon"
          onClick={onZoomOut}
          disabled={!canZoomOut}
          className={styles.minus}
        >
          <MinusIcon />
        </Button>
        <Button
          variant="icon"
          onClick={onZoomIn}
          disabled={!canZoomIn}
          className={styles.plus}
        >
          <PlusIcon />
        </Button>
      </div>
      <Button onClick={onReset} className={styles.reset}>
        <ResetIcon />
      </Button>
    </div>
  );
};
