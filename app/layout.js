import { Outfit } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/app/context/ToastContext";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Harsh Vashishth - Creative Portfolio",
  description: "Modern portfolio for Harsh Vashishth, Web Developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased">
        <ToastProvider>
          {children}
          <FloatingWhatsApp />
        </ToastProvider>
      </body>
    </html>
  );
}

