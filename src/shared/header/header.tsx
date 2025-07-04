"use client";

import Link from "next/link";
import React from "react";
import { useCart } from "@/hooks/useCart";

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const { items } = useCart();
  const cartCount = items.length;

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-10 transition-colors duration-300 ${
        scrolled ? "bg-[#FF784A] border-[#FF784A]" : "bg-white"
      }`}
    >
      <nav className="max-w-[1024px] mx-auto px-4 flex items-center justify-between h-16">
        <Link
          href="/"
          className={`text-xl font-bold tracking-tight transition-colors ${
            scrolled ? "text-white" : "text-[#FF784A]"
          }`}
        >
          어글리어스 마켓
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-base font-medium transition-colors ${
              scrolled ? "text-white" : "text-gray-800 hover:text-[#FF784A]"
            }`}
          >
            홈
          </Link>
          <Link
            href="/cart"
            className={`flex items-center gap-1 text-base font-medium transition-colors relative ${
              scrolled ? "text-white" : "text-gray-800 hover:text-[#FF784A]"
            }`}
          >
            장바구니
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-4 flex items-center justify-center w-4 h-4 text-xs font-bold bg-red-500 text-white rounded-full shadow"
                style={{ minWidth: "16px", height: "16px", fontSize: "10px" }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}