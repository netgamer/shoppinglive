"use client";

import { useState } from "react";
import { GraduationCap, Search } from "lucide-react";
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="w-7 h-7 text-secondary" />
        <h1 className="text-2xl font-bold">교육 프로그램</h1>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="교육 과정을 검색하세요..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 text-sm rounded-full transition ${
              category === cat
                ? "bg-secondary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
