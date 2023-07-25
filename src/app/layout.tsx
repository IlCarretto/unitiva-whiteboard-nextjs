import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./redux/provider";
import { AuthProvider } from "./components/AuthProvider";
import Header from "./components/Header/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocketProvider } from "./context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unitiva Whiteboard",
  description: "Collaborative Whiteboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <ReduxProvider>
            <SocketProvider>{children}</SocketProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
