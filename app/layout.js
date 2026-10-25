import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spendly",
  description: "Track your spending and stay on budget",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable}`}>
      <body>
        <nav className="nav">
          <Link href="/" className="logo">Spendly</Link>
          <Link href="/" >Expenses</Link>
          <Link href="/reports">Reports</Link>
        </nav>
        {children}
        </body>
    </html>
  );
}
