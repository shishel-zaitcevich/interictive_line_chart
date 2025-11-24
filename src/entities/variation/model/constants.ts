export const VARIATION_COLORS: Record<string, string> = {
  '0': '#35BDAD',
  '10001': '#FFB958',
  '10002': '#4142EF',
  '10003': '#DF57BC'
};

export const getVariationKey = (variation: { name: string; id?: number }): string => {
  return variation.id ? variation.id.toString() : '0';
};
