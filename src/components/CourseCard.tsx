"use client";

import Link from "next/link";
import { Star, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { type Course, formatPrice, getTypeLabel } from "@/lib/mock-data";

export default function CourseCard({ course }: { course: Course }) {
  const totalDuration = course.lessons.reduce((sum, l) => sum + l.duration, 0);

  const typeColors: Record<string, string> = {
    vod: "bg-blue-100 text-blue-700",
    live: "bg-red-100 text-red-700",
    offline: "bg-green-100 text-green-700",
    hybrid: "bg-purple-100 text-purple-700",
  };

  const categoryColors: Record<string, string> = {
    "비즈니스/창업": "from-orange-400 to-orange-600",
    "마케팅/브랜딩": "from-blue-400 to-blue-600",
    "라이브커머스 실전": "from-red-400 to-pink-600",
    "IT/디지털": "from-indigo-400 to-indigo-600",
    "자격증/취업": "from-emerald-400 to-emerald-600",
    "어학/글로벌": "from-teal-400 to-teal-600",
  };

  const fillPercentage = (course.currentStudents / course.maxStudents) * 100;

  return (
    <Link href={`/education/${course.id}`} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-shadow duration-500 border border-gray-100/80 card-shine"
      >
        {/* Thumbnail */}
        <div className={`aspect-[16/10] bg-gradient-to-br ${categoryColors[course.category] || "from-gray-400 to-gray-600"} relative overflow-hidden`}>
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/20 text-7xl font-black">{course.category.charAt(0)}</span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className={`absolute top-3 left-3 px-2.5 py-1 ${typeColors[course.type]} text-xs font-bold rounded-full backdrop-blur-sm`}>
            {getTypeLabel(course.type)}
          </span>

          {/* Instructor avatar on thumbnail */}
          {course.instructorImage && (
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <img
                src={course.instructorImage}
                alt={course.instructorName}
                className="w-8 h-8 rounded-full border-2 border-white shadow-md object-cover"
              />
              <span className="text-white text-xs font-medium drop-shadow-md">{course.instructorName}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-secondary">{course.category}</span>
          </div>
          <h3 className="font-bold text-gray-900 group-hover:text-secondary transition-colors duration-300 line-clamp-2 min-h-[2.5rem] text-[15px] leading-snug">
            {course.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(course.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">{course.rating}</span>
            <span className="text-xs text-gray-400">({course.reviewCount})</span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-2.5 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course.currentStudents}/{course.maxStudents}명
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              총 {Math.floor(totalDuration / 60)}시간 {totalDuration % 60}분
            </span>
          </div>

          {/* Enrollment bar */}
          <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                fillPercentage > 80 ? "bg-gradient-to-r from-red-400 to-red-500" : "bg-gradient-to-r from-secondary-light to-secondary"
              }`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
          {fillPercentage > 80 && (
            <p className="text-xs text-red-500 font-medium mt-1">마감 임박!</p>
          )}

          {/* Price */}
          <div className="mt-3 pt-3 border-t border-gray-50 flex items-end justify-between">
            {course.price === 0 ? (
              <span className="text-lg font-extrabold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">무료</span>
            ) : (
              <span className="text-lg font-extrabold text-gray-900">
                {formatPrice(course.price)}
                <span className="text-sm font-normal text-gray-400 ml-0.5">원</span>
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
