import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
// import {Toaster} from "@/components/ui/toaster";
import {SITE_TITLE, SITE_DESCRIPTION} from "@/lib/constants";
import {Providers} from "./providers";
import {AuthProvider} from "@/context/auth-context";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "real estate",
    "property",
    "Cebu",
    "Philippines",
    "realty",
    "house",
    "condo",
    "apartment",
    "land",
  ],
  authors: [{name: "Inter Asian Realty Services Inc."}],
  creator: "Inter Asian Realty Services Inc.",
  publisher: "Inter Asian Realty Services Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://interasianrealty.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_TITLE,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" sizes="any" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://interasianrealty.vercel.app" />
      </head>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
              <div className="flex min-h-screen flex-col">
                <Header />
                <Toaster />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              {/* <Toaster /> */}
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
