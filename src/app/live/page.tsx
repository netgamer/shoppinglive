"use client";

import { useState } from "react";
import { Radio, Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionSection, MotionGrid, MotionItem } from "@/components/Motion";
import LiveCard from "@/components/LiveCard";
import { liveEvents } from "@/lib/mock-data";

const platformFilters = [
  { key: "all", label: "전체" },
  { key: "naver", label: "네이버" },
  { key: "youtube", label: "YouTube" },
  { key: "tiktok", label: "TikTok" },
  { key: "instagram", label: "Instagram" },
  { key: "zoom", label: "Zoom" },
];

const statusFilters = [
  { key: "all", label: "전체" },
  { key: "live", label: "라이브 중", dot: "bg-red-500" },
  { key: "upcoming", label: "예정", dot: "bg-amber-500" },
  { key: "ended", label: "종료", dot: "bg-gray-400" },
];

export default function LivePage() {
  const [platform, setPlatform] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = liveEvents.filter((e) => {
    if (platform !== "all" && e.platform !== platform) return false;
    if (status !== "all" && e.status !== status) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <MotionSection>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-red-50 rounded-2xl">
            <Radio className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">라이브쇼핑</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-14">다양한 플랫폼의 라이브쇼핑을 한곳에서 만나보세요</p>
      </MotionSection>

      {/* Filters */}
      <MotionSection delay={0.1}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mr-2">
              <Filter className="w-4 h-4 text-gray-400" />
              플랫폼
            </div>
            {platformFilters.map((f) => (
              <motion.button
                key={f.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlatform(f.key)}
                className={`px-4 py-2 text-sm rounded-xl font-medium transition-all ${
                  platform === f.key
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mr-2">
              <Filter className="w-4 h-4 text-gray-400" />
              상태
            </div>
            {statusFilters.map((f) => (
              <motion.button
                key={f.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStatus(f.key)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-xl font-medium transition-all ${
                  status === f.key
                    ? "bg-secondary text-white shadow-md shadow-secondary/25"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f.dot && <span className={`w-2 h-2 rounded-full ${status === f.key ? "bg-white" : f.dot}`} />}
                {f.label}
              </motion.button>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Results */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-3xl flex items-center justify-center">
              <Radio className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-400 text-lg font-medium">해당 조건의 라이브가 없습니다.</p>
            <p className="text-gray-300 text-sm mt-1">다른 필터를 선택해보세요</p>
          </motion.div>
        ) : (
          <MotionGrid key={`${platform}-${status}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <MotionItem key={event.id}>
                <LiveCard event={event} />
              </MotionItem>
            ))}
          </MotionGrid>
        )}
      </AnimatePresence>
    </div>
  );
}
