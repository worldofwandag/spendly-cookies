import { getExpenses } from "@/lib/expenses";
import { CATEGORIES } from "@/lib/categories";
import { formatMoney, formatMonth, sum, getMonths } from "@/lib/helpers";

export default async function ReportsPage() {
  const expenses = await getExpenses();
  const months = getMonths(expenses);

  return (
    <main>
      <h1>Monthly report</h1>

      {months.map((month, index) => {
        const monthExpenses = expenses.filter((expense) => expense.date.startsWith(month));
        const total = sum(monthExpenses);

        const breakdown = CATEGORIES.map((name) => ({
          category: name,
          amount: sum(monthExpenses.filter((expense) => expense.category === name)),
        }))
          .filter((row) => row.amount > 0)
          .sort((a, b) => b.amount - a.amount);

        // Months are newest first, so the month before this one is the next item
        const previousMonth = months[index + 1];
        let difference = 0;
        if (previousMonth) {
          const previousExpenses = expenses.filter((expense) => expense.date.startsWith(previousMonth));
          difference = total - sum(previousExpenses);
        }

        return (
          <section key={month} className="card">
            <div className="list-header">
              <h2>{formatMonth(month)}</h2>
              <p className="total">{formatMoney(total)}</p>
            </div>

            {previousMonth && (
              <p className={difference > 0 ? "change up" : "change down"}>
                {formatMoney(Math.abs(difference))} {difference > 0 ? "more" : "less"} than{" "}
                {formatMonth(previousMonth)}
              </p>
            )}

            <p className="muted">Top category: {breakdown[0].category}</p>

            <table className="report-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Spent</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((row) => (
                  <tr key={row.category}>
                    <td>{row.category}</td>
                    <td>{formatMoney(row.amount)}</td>
                    <td>{Math.round((row.amount / total) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      })}
    </main>
  );
}
