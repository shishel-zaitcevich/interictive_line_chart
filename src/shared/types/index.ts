export interface VariationData {
  name: string;
  id?: number;
}

export interface DailyData {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
}

export interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export type DateRange = 'Day' | 'Week';
export type LineStyle = 'Line' | 'Smooth' | 'Area';
export type Theme = 'light' | 'dark';

export interface ChartData {
  variations: VariationData[];
  data: DailyData[];
}

export interface TooltipPayloadEntry {
  name: string;
  value: number;
  color: string;
  dataKey: string;
  payload: Record<string, unknown>;
}

export interface BrushChangeData {
  startIndex?: number;
  endIndex?: number;
}
