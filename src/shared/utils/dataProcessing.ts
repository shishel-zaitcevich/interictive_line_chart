import { getVariationKey } from '../../entities/variation/model/constants';
import type { DailyData, VariationData, ChartDataPoint } from '../types';

export const calculateConversionRate = (
  conversions: number,
  visits: number
): number => {
  if (visits === 0) return 0;
  return (conversions / visits) * 100;
};

export const aggregateByWeek = (data: DailyData[]): DailyData[] => {
  const weeks: { [key: string]: DailyData } = {};

  data.forEach((day) => {
    const date = new Date(day.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!weeks[weekKey]) {
      weeks[weekKey] = {
        date: weekKey,
        visits: {},
        conversions: {},
      };
    }

    Object.keys(day.visits).forEach((key) => {
      weeks[weekKey].visits[key] =
        (weeks[weekKey].visits[key] || 0) + day.visits[key];
      weeks[weekKey].conversions[key] =
        (weeks[weekKey].conversions[key] || 0) + day.conversions[key];
    });
  });

  return Object.values(weeks).sort((a, b) => a.date.localeCompare(b.date));
};

export const processChartData = (
  rawData: DailyData[],
  variations: VariationData[],
  selectedVariations: Set<string>
): ChartDataPoint[] => {
  return rawData.map((day) => {
    const point: ChartDataPoint = { date: day.date };

    variations.forEach((variation) => {
      const key = getVariationKey(variation);
      if (selectedVariations.has(key)) {
        const visits = day.visits[key] || 0;
        const conversions = day.conversions[key] || 0;
        point[variation.name] = Number(
          calculateConversionRate(conversions, visits).toFixed(2)
        );
      }
    });

    return point;
  });
};
