import { createExpense, getExpenses } from "@/lib/expenses";
import { validateExpense } from "@/lib/validate";

export async function GET() {
    const expenses = await getExpenses();
    return Response.json(expenses)
}

export async function POST (request) {
    const data = await request.json();

    const error = validateExpense(data);
    if(error) {
        return Response.json({ error }, { status: 400 })
    }


    const expense = await createExpense(data);
    if (!expense) {
        return Response.json({ error: "Spendly holds 20 expenses.  Delete one to add more."}, { status: 400 })
    }

    return Response.json(expense, { status:201 })
}

