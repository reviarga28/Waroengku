// import { Geist, Geist_Mono } from "next/font/google";
// import { SessionProvider } from "next-auth/react";
import ClientProvider from "@/components/ClientProvider";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Rumah Makan Lezat",
  description: "Menu makanan enak dan murah!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="font-sans">
        <ClientProvider>
          <main className="">{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}

// <html lang="en">
//   <body
//     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//   >
//     {children}
//   </body>
// </html>
