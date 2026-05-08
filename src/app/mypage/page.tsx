"use client";

import Link from "next/link";
import {
  User, BookOpen, Bell, Settings, LogOut,
  ChevronRight, Radio, GraduationCap, Heart,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/Motion";

const menuItems = [
  {
    section: "쇼핑",
    items: [
      { icon: Bell, label: "알림 설정한 라이브", href: "/mypage/alerts", count: 3 },
      { icon: Radio, label: "라이브 참여 이력", href: "/mypage/history", count: 12 },
      { icon: Heart, label: "관심 상품", href: "#", count: 8 },
    ],
  },
  {
    section: "교육",
    items: [
      { icon: BookOpen, label: "내 수강목록", href: "/education/my", count: 3 },
      { icon: GraduationCap, label: "수료증", href: "#", count: 1 },
    ],
  },
  {
    section: "설정",
    items: [
      { icon: User, label: "프로필 수정", href: "#", count: undefined as number | undefined },
      { icon: Settings, label: "알림 설정", href: "#", count: undefined as number | undefined },
    ],
  },
];

export default function MyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Profile */}
      <MotionSection>
        <div className="relative overflow-hidden bg-gradient-to-br from-dark via-dark-light to-dark-medium rounded-3xl p-7 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

          <div className="relative flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-18 h-18 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl flex items-center justify-center text-3xl font-bold backdrop-blur-sm border border-white/10"
              style={{ width: 72, height: 72 }}
            >
              G
            </motion.div>
            <div>
              <h1 className="text-xl font-extrabold">게스트 사용자</h1>
              <p className="text-sm text-gray-400 mt-0.5">guest@example.com</p>
            </div>
          </div>

          {/* Stats */}
          <div className="relative grid grid-cols-3 gap-3 mt-7">
            {[
              { value: 3, label: "수강중", icon: BookOpen },
              { value: 1, label: "수강완료", icon: GraduationCap },
              { value: 3, label: "알림설정", icon: Bell },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="text-center p-3.5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 hover:bg-white/10 transition"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-1 text-white/60" />
                <p className="text-2xl font-extrabold">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Menu */}
      <div className="mt-8 space-y-6">
        {menuItems.map((section, sectionIdx) => (
          <MotionSection key={section.section} delay={sectionIdx * 0.08}>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
              {section.section}
            </h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              {section.items.map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-all ${
                    idx > 0 ? "border-t border-gray-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition">
                      <item.icon className="w-5 h-5 text-gray-500" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count !== undefined && (
                      <span className="text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-light px-2.5 py-0.5 rounded-full shadow-sm">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-300 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </MotionSection>
        ))}
      </div>

      {/* Logout */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full mt-10 flex items-center justify-center gap-2 py-3.5 text-sm text-gray-400 hover:text-red-500 border border-gray-100 rounded-2xl hover:border-red-100 hover:bg-red-50/30 transition-all font-medium"
      >
        <LogOut className="w-4 h-4" />
        로그아웃
      </motion.button>
    </div>
  );
}
