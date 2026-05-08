"use client";

import Link from "next/link";
import {
  User, BookOpen, Bell, Clock, Settings, LogOut,
  ChevronRight, Radio, GraduationCap, Heart,
} from "lucide-react";

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
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Profile */}
      <div className="bg-gradient-to-r from-dark to-dark-light rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
            G
          </div>
          <div>
            <h1 className="text-xl font-bold">게스트 사용자</h1>
            <p className="text-sm text-gray-300 mt-0.5">guest@example.com</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-white/10 rounded-xl">
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-gray-300">수강중</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-xl">
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-gray-300">수강완료</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-xl">
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-gray-300">알림설정</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-6">
        {menuItems.map((section) => (
          <div key={section.section}>
            <h2 className="text-sm font-bold text-gray-400 uppercase mb-3 px-1">
              {section.section}
            </h2>
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              {section.items.map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition ${
                    idx > 0 ? "border-t border-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-800">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count !== undefined && (
                      <span className="text-xs font-bold text-white bg-primary px-2 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full mt-8 flex items-center justify-center gap-2 py-3 text-sm text-gray-400 hover:text-red-500 transition">
        <LogOut className="w-4 h-4" />
        로그아웃
      </button>
    </div>
  );
}
