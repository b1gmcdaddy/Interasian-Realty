"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";
import {Menu, X} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {SITE_TITLE} from "@/lib/constants";
import ThemeToggle from "./theme-toggle";
import Image from "next/image";
import {useAuth} from "@/context/auth-context";

const links = [
  {href: "/", label: "Home"},
  {href: "/properties", label: "Properties"},
  {href: "/contact", label: "Contact"},
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {user, signOut} = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image
              src={"/logo.png"}
              width={40}
              height={40}
              alt="Inter Asian Realty Services Inc."
            />
            <span className="hidden md:inline">{SITE_TITLE}</span>
            <span className="md:hidden text-sm">
              Inter Asian Realty Services Inc.
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}>
                {link.label}
              </Link>
            ))}

            {user && (
              <Link
                href="/admin/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/admin/dashboard"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}>
                Dashboard
              </Link>
            )}

            <div className="ml-4 flex items-center gap-2">
              <ThemeToggle />
              {user ? (
                <Button
                  variant="outline"
                  onClick={signOut}
                  className="cursor-pointer">
                  Sign Out
                </Button>
              ) : (
                <Button asChild className="cursor-pointer">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              )}
            </div>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{opacity: 0, x: "100%"}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: "100%"}}
            transition={{type: "spring", damping: 25, stiffness: 300}}
            className="fixed inset-0 z-50 md:hidden bg-background">
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex flex-col items-center gap-6 p-8">
              {links.map((link) => (
                <motion.div
                  key={link.href}
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.1 * links.indexOf(link)}}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.5}}
                className="mt-4">
                {user ? (
                  <Button
                    variant="outline"
                    onClick={signOut}
                    className="w-full">
                    Sign Out
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}>
                      Get In Touch
                    </Link>
                  </Button>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
