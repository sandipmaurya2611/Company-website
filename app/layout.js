import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "MeetMind AI | Turn Every Conversation Into Actionable Intelligence",
  description: "MeetMind AI automatically transcribes your meetings, generates concise summaries, extracts key action items, and enables instant semantic search across all past conversations using advanced RAG and LLM technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable}`}>
        {children}
      </body>
    </html>
  );
}
