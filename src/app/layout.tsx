import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
// import {Toaster} from "@/components/ui/toaster";
import {SITE_TITLE, SITE_DESCRIPTION} from "@/lib/constants";
import {Providers} from "./providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {/* <Toaster /> */}
        </Providers>
      </body>
    </html>
  );
}
