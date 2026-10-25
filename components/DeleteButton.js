"use client"

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
    const router = useRouter();

    async function handleDelete() {
        if (!confirm("Delete this expense?")) return;
        const response = await fetch(`/api/expenses/${id}`, { method: "DELETE" })
        if(response.ok) {
            router.refresh();
        }
    }

    return (
        <button onClick={handleDelete} className="link-button danger">
            Delete
        </button>
    )
}