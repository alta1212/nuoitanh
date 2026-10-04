export function normalizeAmountInput(value: string) {
  return value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
}

export function formatAmountInput(value: string, separator = ".") {
  return normalizeAmountInput(value).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    separator,
  );
}

export function parseAmount(value: string) {
  const normalized = normalizeAmountInput(value);
  const amount = Number(normalized);
  return normalized && Number.isSafeInteger(amount) && amount >= 2_000
    ? amount
    : null;
}
