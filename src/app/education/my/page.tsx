"use client";

import Link from "next/link";
import { BookOpen, Play, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/Motion";
import { courses, getTypeLabel } from "@/lib/mock-data";

const enrolled = [
  { course: courses[0], progress: 62, status: "ongoing" as const },
  { course: courses[1], progress: 100, status: "completed" as const },
  { course: courses[3], progress: 25, status: "ongoing" as const },
];

export default function MyCoursesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <MotionSection>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-blue-50 rounded-2xl">
            <BookOpen className="w-6 h-6 text-secondary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">내 수강목록</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-14">수강 중인 교육 과정을 확인하세요</p>
      </MotionSection>

      {enrolled.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-3xl flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-gray-300" />
          </div>
          <p className="text-gray-400 text-lg font-medium">수강 중인 교육이 없습니다.</p>
          <Link href="/education" className="mt-4 inline-block text-secondary hover:underline font-medium">
            교육 둘러보기
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {enrolled.map(({ course, progress, status }, idx) => {
            const categoryColors: Record<string, string> = {
              "비즈니스/창업": "from-orange-400 to-orange-600",
              "마케팅/브랜딩": "from-blue-400 to-blue-600",
              "라이브커머스 실전": "from-red-400 to-pink-600",
              "IT/디지털": "from-indigo-400 to-indigo-600",
              "자격증/취업": "from-emerald-400 to-emerald-600",
              "어학/글로벌": "from-teal-400 to-teal-600",
            };

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Link
                  href={`/education/${course.id}`}
                  className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Thumbnail */}
                  <div className={`w-36 h-24 shrink-0 bg-gradient-to-br ${categoryColors[course.category] || "from-gray-400 to-gray-600"} rounded-xl overflow-hidden relative`}>
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/30 text-3xl font-black">{course.category.charAt(0)}</span>
                      </div>
                    )}
                    {progress < 100 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                        <div
                          className="h-full bg-white rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-secondary">{course.category}</span>
                      <span className="text-xs text-gray-300">|</span>
                      <span className="text-xs text-gray-500">{getTypeLabel(course.type)}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-secondary transition-colors duration-300 truncate text-[15px]">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">{course.instructorName}</p>

                    {/* Progress */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                          className={`h-full rounded-full ${progress === 100 ? "bg-gradient-to-r from-green-400 to-green-500" : "bg-gradient-to-r from-secondary-light to-secondary"}`}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700 shrink-0">{progress}%</span>
                      {progress === 100 && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="hidden sm:flex items-center">
                    {progress < 100 ? (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2.5 bg-gradient-to-r from-secondary to-secondary-dark text-white text-sm font-semibold rounded-xl flex items-center gap-1.5 shadow-md shadow-secondary/25"
                      >
                        <Play className="w-4 h-4" />
                        이어보기
                      </motion.div>
                    ) : (
                      <div className="px-5 py-2.5 bg-green-50 text-green-700 text-sm font-semibold rounded-xl flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        수강완료
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
