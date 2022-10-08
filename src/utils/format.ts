export const formatPrice = (value: number, locale = 'en-US', currency = 'USD') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);

export const convertColor = (value: number) => `hsl(${(value / 10) * 157},80%,43%)`;

export const formatVolume = (value: number, locale = 'en-US') =>
  new Intl.NumberFormat(locale).format(Math.round(value));

export const formatPercentage = (value: number, locale = 'en-US') =>
  `${new Intl.NumberFormat(locale).format(Number((value * 100).toFixed(2)))}%`;
