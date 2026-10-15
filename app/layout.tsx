import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/lib/demo";
import { ToastProvider } from "@/lib/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AyuOS",
    template: "%s · AyuOS",
  },
  description: "AyuOS — personal health operating system (demo preview).",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#004345",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <DemoProvider>
          <ToastProvider>
            {/* Desktop backdrop; the app lives in a centered 430px column. */}
            <div className="min-h-dvh bg-surface-dim">
              <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background shadow-lifted">
                {children}
              </div>
            </div>
          </ToastProvider>
        </DemoProvider>
      </body>
    </html>
  );
}
