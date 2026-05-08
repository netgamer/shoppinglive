"use client";

import Link from "next/link";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "라이브쇼핑",
    links: [
      { label: "전체 라이브", href: "/live" },
      { label: "라이브 일정", href: "/live/schedule" },
      { label: "다시보기", href: "/live/replay" },
    ],
  },
  {
    title: "교육프로그램",
    links: [
      { label: "전체 교육", href: "/education" },
      { label: "내 수강목록", href: "/education/my" },
    ],
  },
  {
    title: "고객지원",
    links: [
      { label: "마이페이지", href: "/mypage" },
      { label: "이용약관", href: "#" },
      { label: "개인정보처리방침", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400 mt-auto relative overflow-hidden">
      {/* Subtle gradient decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-primary via-primary-light to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-extrabold text-white">
                Shopping<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Live</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              IUC 남가주대학교에서 주최하는<br />
              교육 연계 라이브쇼핑 플랫폼
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 hover:text-white transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-500">IUC University of Southern California | 사업자등록번호: 000-00-00000</p>
          <p className="text-gray-600">&copy; 2026 ShoppingLive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
