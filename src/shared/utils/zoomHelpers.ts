export const calculateZoomIn = (
  startIndex: number,
  endIndex: number,
  dataLength: number,
  minRange: number = 5
): { start: number; end: number } => {
  const currentRange = endIndex - startIndex;
  const newRange = Math.max(minRange, Math.floor(currentRange * 0.7));
  const center = Math.floor((startIndex + endIndex) / 2);
  const newStart = Math.max(0, center - Math.floor(newRange / 2));
  const newEnd = Math.min(dataLength - 1, newStart + newRange);

  return { start: newStart, end: newEnd };
};

export const calculateZoomOut = (
  startIndex: number,
  endIndex: number,
  dataLength: number
): { start: number; end: number } => {
  const currentRange = endIndex - startIndex;
  const newRange = Math.min(dataLength, Math.floor(currentRange * 1.5));
  const center = Math.floor((startIndex + endIndex) / 2);
  const newStart = Math.max(0, center - Math.floor(newRange / 2));
  const newEnd = Math.min(dataLength - 1, newStart + newRange);

  return { start: newStart, end: newEnd };
};

export const canZoomIn = (
  startIndex: number,
  endIndex: number,
  minRange: number = 5
): boolean => {
  return endIndex - startIndex > minRange;
};

export const canZoomOut = (
  startIndex: number,
  endIndex: number,
  dataLength: number
): boolean => {
  return endIndex - startIndex < dataLength - 1;
};
