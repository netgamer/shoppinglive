"use client";

import { useState } from "react";
import { GraduationCap, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionSection, MotionGrid, MotionItem } from "@/components/Motion";
import CourseCard from "@/components/CourseCard";
import { courses, categories } from "@/lib/mock-data";

export default function EducationPage() {
  const [category, setCategory] = useState("전체");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    if (category !== "전체" && c.category !== category) return false;
    if (search && !c.title.includes(search) && !c.description.includes(search)) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <MotionSection>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-blue-50 rounded-2xl">
            <GraduationCap className="w-6 h-6 text-secondary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">교육 프로그램</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-14">IUC 남가주대학교 공인 교육 과정</p>
      </MotionSection>

      {/* Search */}
      <MotionSection delay={0.05}>
        <div className="relative mb-6 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="교육 과정을 검색하세요..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all shadow-sm"
          />
        </div>
      </MotionSection>

      {/* Category tabs */}
      <MotionSection delay={0.1}>
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 text-sm rounded-xl font-medium transition-all ${
                category === cat
                  ? "bg-secondary text-white shadow-md shadow-secondary/25"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </motion.button>
          ))}
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
              <GraduationCap className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-400 text-lg font-medium">검색 결과가 없습니다.</p>
            <p className="text-gray-300 text-sm mt-1">다른 검색어를 입력해보세요</p>
          </motion.div>
        ) : (
          <MotionGrid key={`${category}-${search}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <MotionItem key={course.id}>
                <CourseCard course={course} />
              </MotionItem>
            ))}
          </MotionGrid>
        )}
      </AnimatePresence>
    </div>
  );
}
