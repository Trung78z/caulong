import Provider from "@/hooks/Authcontext";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import NavbarPage from "../components/Navbar/Navbar";
import UseJavascriptBootstrap from "@/hooks/Bootstrap";

import clsx from "clsx";
import Footer from "@/components/Footer/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Cầu Lông",
    default: "Giao Lưu Cầu Lông",
  },
  icons: {
    icon: "/ico/shoes.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className)}>
        <Provider>
          <NavbarPage />
          <div className="children">{children}</div>
          <Footer />
          <UseJavascriptBootstrap />
        </Provider>
      </body>
    </html>
  );
}
