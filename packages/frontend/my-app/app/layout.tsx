import { Inter } from "next/font/google";
import "./globals.css";
import { ConnectkitProvider } from "./connectkit-provider";
import Header from "./Header";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <ConnectkitProvider>
            <Header />
            {children}
          </ConnectkitProvider>
        </div>
      </body>
    </html>
  );
}
