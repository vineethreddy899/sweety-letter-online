import type { Metadata } from "next";
import { Inter,Lora,Cormorant_Garamond } from "next/font/google";
import "./globals.css";
const inter=Inter({subsets:["latin"],variable:"--font-inter"});
const lora=Lora({subsets:["latin"],variable:"--font-lora"});
const cormorant=Cormorant_Garamond({subsets:["latin"],weight:["400","500","600","700"],variable:"--font-cormorant"});
export const metadata:Metadata={title:"Online Letter — Write a letter someone can open",description:"Write a heartfelt letter, seal it in an envelope, and share a link for someone special to open online."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${inter.variable} ${lora.variable} ${cormorant.variable} font-sans antialiased`}>{children}</body></html>}
