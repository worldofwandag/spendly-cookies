import { formatMoney } from "@/lib/helpers";

export default function BudgetBar({ category, spent, budget }) {
    const percent = Math.round((spent / budget) * 100);

    let status = "good";
    if(percent >= 100) status = "over";
    else if (percent >=75 ) status = "close"
    //Percent spent decides the color. Under 75%, green. 75 and up, orange. 100 and up, red.

    return (
    <div className="budget">
      <div className="budget-label">
        <span>{category}</span>
        <span className="muted">
          {formatMoney(spent)} of {formatMoney(budget)}
        </span>
      </div>
      <div className="budget-track">
        <div className={`budget-fill ${status}`} style={{ width: `${Math.min(percent, 100)}%` }} />
        {/* Math.min(percent, 100) stops the bar from spilling out of its track when you're over budget. The label still shows the real numbers. */}
      </div>
    </div>
  );

}