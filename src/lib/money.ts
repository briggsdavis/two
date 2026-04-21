export type Money = { amount: string; currencyCode: string }

export function formatMoney(m: Money) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: m.currencyCode,
  }).format(Number(m.amount))
}
