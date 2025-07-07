"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { items, fetchCart } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const cartCount = items.length;

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    await fetchCart();
    setDropdownOpen(false);
  };

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
          데일리 마켓
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
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition select-none"
                onClick={() => setDropdownOpen((prev) => !prev)}
                type="button"
              >
                <span className="font-bold">{user?.nickname}님</span>
                <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20">
                  <path fill="currentColor" d="M5 8l5 5 5-5H5z" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-xl rounded-xl p-1 z-50">
                  <Link
                    href="/auth/mypage"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#FFF0EB] rounded-xl"
                    onClick={() => setDropdownOpen(false)}
                  >
                    마이페이지
                  </Link>
                  <Link
                    href="/order/history"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#FFF0EB] rounded-xl"
                    onClick={() => setDropdownOpen(false)}
                  >
                    주문내역
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-[#FFF0EB] rounded-xl"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login">로그인</Link>
              <Link href="/auth/register">회원가입</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}