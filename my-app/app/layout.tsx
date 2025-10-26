'use client';
import type { ReactNode } from "react";
import { useEffect } from "react";
import { HardalProvider } from 'hardal/react';
import { HardalBootstrap } from './providers'; // 
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    console.log("Initializing Hardal readiness check...");
    let attempts = 0;
    const maxAttempts = 20; // 20 * 500ms = 10 seconds
    const interval = setInterval(() => {
      if (window.hardal && window.hardal.track) {
        console.log("Hardal ready!");
        clearInterval(interval);
        window.hardal.track('page_loaded');
      } else {
        console.log("Waiting for Hardal to be ready...");
        attempts++;
        if (attempts >= maxAttempts) {
          console.warn("⚠ Hardal failed to load after 10 seconds");
          clearInterval(interval);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="tr">
      <head>
        {/* Google Tag Manager - Head */}
      </head>
      <body>
        {/* Hardal script’i should been loaded on gtm */}
      
    <HardalProvider 
      config={{
        website: process.env.NEXT_PUBLIC_WEBSITE || "cmh4lut1e0008i90xj6hivu5r",
        hostUrl: process.env.NEXT_PUBLIC_HOSTURL || "https://cmh4lut1e0008i90xj6hivu5r-signal.usehardal.com"
      }}
      autoPageTracking={true}  // ✅ Tracks all route changes
    >
      <HardalBootstrap /> 
      {children}
    </HardalProvider>
      </body>
    </html>
  );
}