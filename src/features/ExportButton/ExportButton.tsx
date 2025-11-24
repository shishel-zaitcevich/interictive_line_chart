import React from 'react';

import html2canvas from 'html2canvas';
import classNames from 'classnames';

import type { Theme } from '../../shared/types';
import { Button } from '../../shared/ui/Button/Button';
import { DowloadIcon } from '../../shared/ui/icons/DowloadIcon';

import styles from './ExportButton.module.scss';

interface ExportButtonProps {
  theme: Theme;
  className?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  theme,
  className,
}) => {
  const exportToPNG = async () => {
    const chartElement = document.querySelector('.recharts-wrapper');
    if (!chartElement) {
      console.error('Chart element not found');
      return;
    }

    try {
      const canvas = await html2canvas(chartElement as HTMLElement, {
        backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
        logging: false,
        useCORS: true,
      });

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().split('T')[0];
            link.download = `ab-test-chart-${timestamp}.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
          }
        },
        'image/png',
        1.0
      );
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  };

  return (
    <Button
      onClick={exportToPNG}
      variant="ghost"
      className={classNames(className, styles.downloadBtn)}
    >
      <DowloadIcon />
    </Button>
  );
};
