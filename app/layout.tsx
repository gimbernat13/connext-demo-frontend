import type { Metadata } from "next";
import { Inter , IBM_Plex_Mono} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Diego - Connext  ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibm.className}>{children}</body>
    </html>
  );
}
