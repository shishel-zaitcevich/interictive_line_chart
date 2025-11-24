import { useState, useCallback } from 'react';

interface UseVariationsReturn {
  selectedVariations: Set<string>;
  toggleVariation: (key: string) => void;
}

export const useVariations = (initialKeys: string[]): UseVariationsReturn => {
  const [selectedVariations, setSelectedVariations] = useState<Set<string>>(
    new Set(initialKeys)
  );

  const toggleVariation = useCallback((variationKey: string) => {
    setSelectedVariations((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(variationKey)) {
        if (newSelected.size > 1) {
          newSelected.delete(variationKey);
        }
      } else {
        newSelected.add(variationKey);
      }
      return newSelected;
    });
  }, []);

  return {
    selectedVariations,
    toggleVariation
  };
};
