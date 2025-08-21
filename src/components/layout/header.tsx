"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LayoutDashboard } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/donor", label: "Donor Portal" },
    { href: "/hospital", label: "Hospital Portal" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="bg-gradient-to-r from-black/30 via-red-900/50 to-black/30 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between select-none">
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="BloodLink Logo"
            width={56}
            height={56}
            className="w-14 h-14 drop-shadow-lg"
          />
          <h1 className="text-4xl font-extrabold font-headline tracking-wide drop-shadow-md">
            BloodLink
          </h1>
        </Link>
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center space-x-8 font-semibold text-white text-lg tracking-wide" role="navigation">
           <Link href="/" className="flex items-center gap-2 hover:underline hover:text-red-300 transition px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          {navLinks.map((link) => (
             <Link key={link.href} href={link.href} className="hover:underline hover:text-red-300 transition px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400">
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Toggle menu"
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-red-400 rounded-md p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav aria-label="Mobile Navigation" className="md:hidden bg-red-900/90 text-red-300 px-6 py-4 space-y-3 font-semibold text-lg tracking-wide" role="navigation">
          <Link href="/" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
          {navLinks.map((link) => (
             <Link key={link.href} href={link.href} className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
