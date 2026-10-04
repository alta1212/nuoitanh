export function parseAmount(value: string) {
  const amount = Math.floor(Number(value));
  return Number.isFinite(amount) && amount >= 2_000 ? amount : null;
}
