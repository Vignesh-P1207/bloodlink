"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#660000] via-[#990000] to-[#cc0000] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-6 flex items-center justify-between select-none">
        <div className="flex items-center space-x-4">
           <Image 
            src="https://storage.googleapis.com/a1aa/image/eb2bdec4-9c38-4d99-8c64-c2fae5664a95.jpg" 
            alt="Red blood drop icon symbolizing blood donation" 
            width={64} 
            height={64} 
            className="w-16 h-16 drop-shadow-lg"
            data-ai-hint="logo blood"
          />
          <h1 className="text-4xl font-extrabold font-headline tracking-wide drop-shadow-md">
            BloodLink
          </h1>
        </div>
        <nav aria-label="Primary Navigation" className="hidden md:flex space-x-12 font-semibold text-white text-lg tracking-wide" role="navigation">
          <Link href="#donor" className="hover:underline hover:text-red-300 transition px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400">
            Donor Portal
          </Link>
          <Link href="#hospital" className="hover:underline hover:text-red-300 transition px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400">
            Hospital Portal
          </Link>
          <Link href="#admin" className="hover:underline hover:text-red-300 transition px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400">
            Admin Dashboard
          </Link>
        </nav>
        <button
          aria-label="Toggle menu"
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav aria-label="Mobile Navigation" className="md:hidden bg-[#990000] bg-opacity-90 text-red-300 px-6 py-3 space-y-3 font-semibold text-lg tracking-wide" role="navigation">
          <Link href="#donor" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
            Donor Portal
          </Link>
          <Link href="#hospital" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
            Hospital Portal
          </Link>
          <Link href="#admin" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
            Admin Dashboard
          </Link>
        </nav>
      )}
    </header>
  );
}
