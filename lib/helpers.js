export function formatMoney(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function sum(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function formatMonth(month) {
  const [year, monthNumber] = month.split("-");
  return new Date(year, monthNumber - 1).toLocaleString("en-US", { month: "long", year: "numeric" });
}
//formatMonth turns "2026-10" into "October 2026".

export function getMonths(expenses) {
  return [...new Set(expenses.map((expense) => expense.date.slice(0, 7)))];
}
//getMonths grabs the first seven characters of each date. "2026-10-03" becomes "2026-10". A Set throws out the duplicates, and the three dots turn it back into a normal array we can map over.

