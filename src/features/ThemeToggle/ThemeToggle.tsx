import React from 'react';
import classNames from 'classnames';

import { Sun, Moon } from 'lucide-react';
import { Button } from '../../shared/ui/Button/Button';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
  className,
}) => {
  return (
    <Button
      onClick={onToggle}
      variant="ghost"
      className={classNames(className)}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      {isDark ? 'Light' : 'Dark'}
    </Button>
  );
};
