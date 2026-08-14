import type { Metadata, Viewport } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/components/SoundProvider";
import { PwaRegister } from "@/components/PwaRegister";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PopSchool! — Pop the answers, feel the magic",
  description:
    "A super fun learning playground for kids. Math, English, Science and Social Studies — with cheers, coins, confetti and read-aloud magic!",
  applicationName: "PopSchool!",
  appleWebApp: { capable: true, title: "PopSchool!", statusBarStyle: "default" },
  icons: {
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#5b3bb8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fredoka.variable} h-full antialiased`}>
      <body className="min-h-full">
        <SoundProvider>{children}</SoundProvider>
        <PwaRegister />
      </body>
    </html>
  );
}
