import "./globals.scss";
import { Inter } from "next/font/google";
import Providers from "./providers";
import ThemeSwitcher from "@/components/darkMode/DarkMode";
import { UserProvider } from "../contexts/contexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kars - Homepage",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-black bg-white">
        <Providers>
          <UserProvider>
            <ThemeSwitcher />
            {children}
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
