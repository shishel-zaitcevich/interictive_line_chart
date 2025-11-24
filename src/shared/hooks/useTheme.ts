import { useState, useEffect, useLayoutEffect } from 'react';
import type { Theme } from '../types';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useIsomorphicLayoutEffect(() => {
    let initial: Theme = 'light';

    try {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved && (saved === 'light' || saved === 'dark')) {
        initial = saved;
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        initial = prefersDark ? 'dark' : 'light';
      }
    } catch {
      initial = 'light';
    }

    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const hasManualTheme = localStorage.getItem('theme') !== null;
      if (!hasManualTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
  };
};
