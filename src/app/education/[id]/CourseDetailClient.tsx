"use client";

import Link from "next/link";
import {
  ArrowLeft, Star, Users, Clock, Calendar, MapPin, Video,
  Monitor, CheckCircle2, BookOpen,
} from "lucide-react";
import { courses, formatPrice, getTypeLabel } from "@/lib/mock-data";

export default function CourseDetailClient({ id }: { id: string }) {
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">교육 과정을 찾을 수 없습니다.</p>
        <Link href="/education" className="mt-4 inline-block text-secondary hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const totalDuration = course.lessons.reduce((sum, l) => sum + l.duration, 0);

  const categoryColors: Record<string, string> = {
    "비즈니스/창업": "from-orange-400 to-orange-600",
    "마케팅/브랜딩": "from-blue-400 to-blue-600",
    "라이브커머스 실전": "from-red-400 to-pink-600",
    "IT/디지털": "from-indigo-400 to-indigo-600",
    "자격증/취업": "from-emerald-400 to-emerald-600",
    "어학/글로벌": "from-teal-400 to-teal-600",
  };

  const typeIcons = {
    vod: <Video className="w-5 h-5" />,
    live: <Monitor className="w-5 h-5" />,
    offline: <MapPin className="w-5 h-5" />,
    hybrid: <BookOpen className="w-5 h-5" />,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/education" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-secondary mb-6">
        <ArrowLeft className="w-4 h-4" /> 교육 프로그램 목록
      </Link>

      {/* Hero */}
      <div className={`aspect-[21/9] rounded-2xl bg-gradient-to-br ${categoryColors[course.category] || "from-gray-400 to-gray-600"} relative overflow-hidden`}>
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/10 text-[150px] font-black">{course.category.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-sm font-medium rounded-full">
            {course.category}
          </span>
        </div>
      </div>

      {/* Main info */}
      <div className="mt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{course.title}</h1>
        <p className="mt-2 text-gray-600 leading-relaxed">{course.description}</p>

        {/* Meta */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              {typeIcons[course.type]}
              수강 방식
            </div>
            <p className="font-bold text-gray-900">{getTypeLabel(course.type)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Calendar className="w-5 h-5" />
              교육 기간
            </div>
            <p className="font-bold text-gray-900">{course.startDate} ~</p>
            <p className="text-sm text-gray-500">{course.endDate}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Clock className="w-5 h-5" />
              총 수업시간
            </div>
            <p className="font-bold text-gray-900">{Math.floor(totalDuration / 60)}시간 {totalDuration % 60}분</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Users className="w-5 h-5" />
              수강 현황
            </div>
            <p className="font-bold text-gray-900">{course.currentStudents}/{course.maxStudents}명</p>
            <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: `${(course.currentStudents / course.maxStudents) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Instructor */}
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
          <h3 className="text-lg font-bold mb-3">강사 소개</h3>
          <div className="flex items-center gap-4">
            {course.instructorImage ? (
              <img src={course.instructorImage} alt={course.instructorName} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold text-xl">
                {course.instructorName.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-bold text-gray-900 text-lg">{course.instructorName}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold">{course.rating}</span>
                <span className="text-sm text-gray-500">({course.reviewCount}개 리뷰)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary" />
            커리큘럼 ({course.lessons.length}강)
          </h3>
          <div className="space-y-2">
            {course.lessons.map((lesson, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-gray-900">{lesson.title}</span>
                </div>
                <span className="text-sm text-gray-500">{lesson.duration}분</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-lg sticky bottom-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              {course.price === 0 ? (
                <span className="text-3xl font-black text-primary">무료</span>
              ) : (
                <span className="text-3xl font-black text-gray-900">
                  {formatPrice(course.price)}
                  <span className="text-lg font-normal text-gray-500">원</span>
                </span>
              )}
            </div>
            <button
              onClick={() => alert("수강 신청이 완료되었습니다!")}
              className="px-8 py-3.5 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-dark transition"
            >
              수강 신청하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
