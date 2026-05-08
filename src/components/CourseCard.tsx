import Link from "next/link";
import { Star, Users, Clock } from "lucide-react";
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

  return (
    <Link href={`/education/${course.id}`} className="group block">
      <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border border-gray-100">
        {/* Thumbnail */}
        <div className={`aspect-[16/10] bg-gradient-to-br ${categoryColors[course.category] || "from-gray-400 to-gray-600"} relative overflow-hidden`}>
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/20 text-7xl font-black">{course.category.charAt(0)}</span>
            </div>
          )}
          <span className={`absolute top-3 left-3 px-2.5 py-1 ${typeColors[course.type]} text-xs font-bold rounded-full`}>
            {getTypeLabel(course.type)}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs font-medium text-secondary mb-1">{course.category}</p>
          <h3 className="font-bold text-gray-900 group-hover:text-secondary transition-colors line-clamp-2 min-h-[2.5rem]">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{course.instructorName}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-gray-900">{course.rating}</span>
            <span className="text-xs text-gray-400">({course.reviewCount})</span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course.currentStudents}/{course.maxStudents}명
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              총 {Math.floor(totalDuration / 60)}시간 {totalDuration % 60}분
            </span>
          </div>

          {/* Price */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            {course.price === 0 ? (
              <span className="text-lg font-bold text-primary">무료</span>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(course.price)}
                <span className="text-sm font-normal text-gray-500">원</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
