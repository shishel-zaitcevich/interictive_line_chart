import { useState, useCallback } from 'react';
import {
  calculateZoomIn,
  calculateZoomOut,
  canZoomIn,
  canZoomOut,
} from '../utils/zoomHelpers';

interface UseZoomProps {
  dataLength: number;
  minRange?: number;
}

interface UseZoomReturn {
  startIndex: number;
  endIndex: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleResetZoom: () => void;
  canZoomInValue: boolean;
  canZoomOutValue: boolean;
}

export const useZoom = ({
  dataLength,
  minRange = 5,
}: UseZoomProps): UseZoomReturn => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(dataLength - 1);

  const handleZoomIn = useCallback(() => {
    const { start, end } = calculateZoomIn(
      startIndex,
      endIndex,
      dataLength,
      minRange
    );
    setStartIndex(start);
    setEndIndex(end);
  }, [startIndex, endIndex, dataLength, minRange]);

  const handleZoomOut = useCallback(() => {
    const { start, end } = calculateZoomOut(startIndex, endIndex, dataLength);
    setStartIndex(start);
    setEndIndex(end);
  }, [startIndex, endIndex, dataLength]);

  const handleResetZoom = useCallback(() => {
    setStartIndex(0);
    setEndIndex(dataLength - 1);
  }, [dataLength]);

  const canZoomInValue = canZoomIn(startIndex, endIndex, minRange);
  const canZoomOutValue = canZoomOut(startIndex, endIndex, dataLength);

  return {
    startIndex,
    endIndex,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    canZoomInValue,
    canZoomOutValue,
  };
};
