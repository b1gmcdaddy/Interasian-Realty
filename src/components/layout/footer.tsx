"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {
  Building,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {SITE_TITLE} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            viewport={{once: true}}>
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl mb-4">
              <Building className="h-6 w-6" />
              <span>{SITE_TITLE}</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Your trusted partner in finding the perfect property. Providing
              exceptional real estate services since 2010.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/cebuxrealty"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.1}}
            viewport={{once: true}}>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground hover:text-foreground transition-colors">
                  Properties
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.2}}
            viewport={{once: true}}>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  Consolacion
                  <br />
                  Cebu
                  <br />
                  Philippines 6001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">0917 677 7190</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  connietangpuziars@gmail.com
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.3}}
            viewport={{once: true}}>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest property listings and
              real estate news.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                type="email"
                className="flex-grow"
              />
              <Button>Subscribe</Button>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {SITE_TITLE} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
