'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { createContext, useState } from "react";
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"] });
export const GlobalInfo = createContext(null);



export default function RootLayout({ children }) {
  const [data, setData] = useState('');

  return (
    <html lang="en">
      <GlobalInfo.Provider value={{data,setData}}>
      <body className={inter.className}>{children}         <Analytics />
</body>
      </GlobalInfo.Provider>
    </html>
  );
}
