import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import classNames from 'classnames';

import { ArrowIcon } from '../icons/ArrowIcon';

import styles from './Dropdown.module.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  children?: ReactNode;
  options?: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  closeOnSelect?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  children,
  className,
  options,
  value,
  onChange,
  closeOnSelect = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  const isSelectMode = Boolean(
    options && options.length > 0 && onChange && value !== undefined
  );

  const displayLabel = isSelectMode
    ? (options!.find((opt) => opt.value === value)?.label ?? label)
    : label;

  return (
    <div className={classNames(styles.dropdown, className)} ref={dropdownRef}>
      <button
        className={classNames(styles.trigger, { [styles.open]: isOpen })}
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.label}>{displayLabel}</span>
        <ArrowIcon
          className={classNames(styles.icon, { [styles.rotated]: isOpen })}
        />
      </button>

      {isOpen && (
        <div className={styles.menu} role="listbox">
          <div className={styles.content}>
            {isSelectMode
              ? options!.map((option) => (
                  <div
                    key={option.value}
                    className={classNames(styles.option, {
                      [styles.selected]: option.value === value,
                    })}
                    onClick={() => handleSelect(option.value)}
                    role="option"
                    aria-selected={option.value === value}
                  >
                    {option.label}
                  </div>
                ))
              : children}
          </div>
        </div>
      )}
    </div>
  );
};
