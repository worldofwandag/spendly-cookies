import "server-only";
import { readFile } from "node:fs/promises"
import path from "node:path";
import { cookies } from "next/headers";

const starterFile = path.join(process.cwd(), "data", "expenses.json");
const budgetsFile = path.join(process.cwd(), "data", "budgets.json");
const MAX_EXPENSES = 20;

export async function getExpenses() {
  
    // await new Promise((resolve) => setTimeout(resolve, 4000)); // TEMP: fake slow data
    
    const cookieStore = await cookies();
    const saved = cookieStore.get("expenses");

    //First visit: no coookie yet, so start with sample expenses
    const text = saved ? saved.value : await readFile(starterFile, "utf8");
    const expenses = JSON.parse(text);

    
    return expenses.sort((a, b) => b.date.localeCompare(a.date))
}

export async function saveExpenses(expenses) {
  const cookieStore = await cookies();
  cookieStore.set("expenses", JSON.stringify(expenses), {
    path: "/", // every page can read it
    httpOnly: true, // only our server can read it, not browser scripts
    maxAge: 60 * 60 * 24 * 365, // keep it for a year (in seconds)
  });
}

export async function createExpense({ title, amount, category, date }) { //this will be used in the POST function 
  const expenses = await getExpenses(); //make it a variable so we could add it saveExpense spread operator array
  if (expenses.length >= MAX_EXPENSES) return null

  // A short id is plenty for one person's list, and keeps the cookie small
  const id = crypto.randomUUID().slice(0, 8);
  const expense = { id, title: title.trim(), amount, category, date };
  await saveExpenses([...expenses, expense]);
  return expense;
}

export async function deleteExpense(id) {
  const expenses = await getExpenses(); //make it a variable so we could .filter
  const remaining = expenses.filter((expense) => expense.id !== id )
  if (remaining.length === expenses.length) return false;

  await saveExpenses(remaining);
  return true;
}

export async function getExpense(id) {
  const expenses = await getExpenses(); //make it a variable so we could .find
  return expenses.find((expense) => expense.id === id)
}

export async function updateExpense(id, { title, amount, category, date}) {
  const expenses = await getExpenses(); //make it a variable so we could .find
  const expense = expenses.find((expense) => expense.id === id);
  if (!expense) return null;

  const updated = { ... expense, title: title.trim(), amount, category, date };
  await saveExpenses(expenses.map((expense) => (expense.id === id ? updated : expense)));
  return updated;
}

export async function getBudgets() {
  const text = await readFile(budgetsFile, "utf8");
  return JSON.parse(text);
}

//Budgets are only ever read, never saved, so a plain file is fine here


