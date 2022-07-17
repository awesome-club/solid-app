export function yesterday() {
  const dt = new Date(Date.now() - (24 * 60 * 60 * 1000));
  return `${dt.getFullYear()}-${trail(dt.getMonth())}-${trail(dt.getDate())}`;
}

function trail(value: number) {
  return (value > 9) ? `${value}` : `0${value}`;
}
