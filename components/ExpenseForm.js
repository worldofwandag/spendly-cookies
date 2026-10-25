"use client"

import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ExpenseForm({ expense }) {
    const router = useRouter();
    const isEditing = Boolean(expense)

    const [title, setTitle] = useState(expense?.title ?? "");
    const [amount, setAmount] = useState(expense?.amount ?? "");
    const [category, setCategory] = useState(expense?.category ?? CATEGORIES[0]);
    const [date, setDate] = useState(expense?.date ?? "");
    //expense?.title means: read the title only if there is an expense. On the add page there isn't one, and without the ?. the page would crash.

    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setError("")
        
        const url = isEditing ? `/api/expenses/${expense.id}` : "/api/expenses";
        const response = await fetch(url, {
            method: isEditing ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, amount: Number(amount), category, date}), 
        });

        if (!response.ok) {
          const data = await response.json();
          setError(data.error);
          return;
        }

        router.push("/")
    }

    return (
    <form onSubmit={handleSubmit} className="card form">
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Groceries" />
      </label>

      <label>
        Amount ($)
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="25.00"
        />
      </label>

      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </label>

      <label>
        Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="button">
          {isEditing ? "Save changes" : "Add expense"}
        </button>
        <Link href="/">Cancel</Link>
      </div>
    </form>
  );

}