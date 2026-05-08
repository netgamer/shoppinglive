"use client";

import Link from "next/link";
import { BookOpen, Play, Clock, CheckCircle2 } from "lucide-react";
import { courses, getTypeLabel } from "@/lib/mock-data";

// Mock enrolled courses (first 3 courses with progress)
const enrolled = [
  { course: courses[0], progress: 62, status: "ongoing" as const },
  { course: courses[1], progress: 100, status: "completed" as const },
  { course: courses[3], progress: 25, status: "ongoing" as const },
];

export default function MyCoursesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-7 h-7 text-secondary" />
        <h1 className="text-2xl font-bold">내 수강목록</h1>
      </div>

      {enrolled.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>수강 중인 교육이 없습니다.</p>
          <Link href="/education" className="mt-4 inline-block text-secondary hover:underline">
            교육 둘러보기
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enrolled.map(({ course, progress, status }) => {
            const categoryColors: Record<string, string> = {
              "비즈니스/창업": "from-orange-400 to-orange-600",
              "마케팅/브랜딩": "from-blue-400 to-blue-600",
              "라이브커머스 실전": "from-red-400 to-pink-600",
              "IT/디지털": "from-indigo-400 to-indigo-600",
              "자격증/취업": "from-emerald-400 to-emerald-600",
              "어학/글로벌": "from-teal-400 to-teal-600",
            };

            return (
              <Link
                key={course.id}
                href={`/education/${course.id}`}
                className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition group"
              >
                {/* Thumbnail */}
                <div className={`w-32 h-20 shrink-0 bg-gradient-to-br ${categoryColors[course.category] || "from-gray-400 to-gray-600"} rounded-lg flex items-center justify-center`}>
                  <span className="text-white/30 text-3xl font-black">{course.category.charAt(0)}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-secondary">{course.category}</span>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-xs text-gray-500">{getTypeLabel(course.type)}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-secondary transition truncate">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">{course.instructorName}</p>

                  {/* Progress */}
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${progress === 100 ? "bg-green-500" : "bg-secondary"}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-700 shrink-0">{progress}%</span>
                    {progress === 100 && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                  </div>
                </div>

                {/* Action */}
                <div className="hidden sm:flex items-center">
                  {progress < 100 ? (
                    <div className="px-4 py-2 bg-secondary text-white text-sm font-medium rounded-lg flex items-center gap-1.5">
                      <Play className="w-4 h-4" />
                      이어보기
                    </div>
                  ) : (
                    <div className="px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-lg">
                      수강완료
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
