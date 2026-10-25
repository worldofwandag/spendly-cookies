"use client"

export default function ErrorPage({ retry }) {
    return (
        <main>
            <h1>Something went wrong</h1>
            <p className="muted">We could not load your expenses.  Please try again</p>
            <button className="button" onClick={ () => retry() }>
                Try again
            </button>
        </main>
    )
}