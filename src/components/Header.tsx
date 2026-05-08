"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, GraduationCap, User, Bell } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-dark">
            Shopping<span className="text-primary">Live</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/live" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse-live" />
            라이브쇼핑
          </Link>
          <Link href="/education" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-secondary transition-colors">
            <GraduationCap className="w-4 h-4" />
            교육프로그램
          </Link>
          <Link href="/live/schedule" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            라이브일정
          </Link>
          <Link href="/live/replay" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            다시보기
          </Link>
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>
          <Link
            href="/auth"
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
          >
            로그인
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link href="/live" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>
            라이브쇼핑
          </Link>
          <Link href="/education" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>
            교육프로그램
          </Link>
          <Link href="/live/schedule" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>
            라이브일정
          </Link>
          <Link href="/live/replay" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>
            다시보기
          </Link>
          <Link href="/mypage" className="block py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>
            마이페이지
          </Link>
          <Link
            href="/auth"
            className="block text-center py-2.5 text-sm font-medium text-white bg-primary rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            로그인
          </Link>
        </div>
      )}
    </header>
  );
}
