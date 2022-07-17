const Format = new Intl.NumberFormat();

export function fmt(value: number) {
  return Format.format(value);
}
