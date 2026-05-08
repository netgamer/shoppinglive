"use client";

import Link from "next/link";
import {
  ArrowLeft, Star, Users, Clock, Calendar, MapPin, Video,
  Monitor, CheckCircle2, BookOpen, Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/Motion";
import { courses, formatPrice, getTypeLabel } from "@/lib/mock-data";

export default function CourseDetailClient({ id }: { id: string }) {
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-3xl flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-gray-300" />
        </div>
        <p className="text-gray-500 text-lg">교육 과정을 찾을 수 없습니다.</p>
        <Link href="/education" className="mt-4 inline-block text-secondary hover:underline font-medium">
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <MotionSection>
        <Link href="/education" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-secondary mb-6 font-medium transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          교육 프로그램 목록
        </Link>
      </MotionSection>

      {/* Hero */}
      <MotionSection>
        <div className={`aspect-[21/9] rounded-3xl bg-gradient-to-br ${categoryColors[course.category] || "from-gray-400 to-gray-600"} relative overflow-hidden shadow-2xl`}>
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/10 text-[150px] font-black">{course.category.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <span className="px-4 py-1.5 bg-white/15 backdrop-blur-md text-white text-sm font-semibold rounded-xl border border-white/10">
              {course.category}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-xl">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "fill-white/20 text-white/20"}`} />
              ))}
              <span className="text-white text-sm font-bold ml-1">{course.rating}</span>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Main info */}
      <MotionSection delay={0.1} className="mt-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{course.title}</h1>
        <p className="mt-3 text-gray-600 leading-relaxed text-lg">{course.description}</p>

        {/* Meta cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: typeIcons[course.type], label: "수강 방식", value: getTypeLabel(course.type), color: "bg-blue-50" },
            { icon: <Calendar className="w-5 h-5" />, label: "교육 기간", value: `${course.startDate} ~`, sub: course.endDate, color: "bg-purple-50" },
            { icon: <Clock className="w-5 h-5" />, label: "총 수업시간", value: `${Math.floor(totalDuration / 60)}시간 ${totalDuration % 60}분`, color: "bg-amber-50" },
            { icon: <Users className="w-5 h-5" />, label: "수강 현황", value: `${course.currentStudents}/${course.maxStudents}명`, color: "bg-green-50" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className={`p-4 ${item.color} rounded-2xl`}
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1.5">
                {item.icon}
                {item.label}
              </div>
              <p className="font-bold text-gray-900">{item.value}</p>
              {item.sub && <p className="text-sm text-gray-500">{item.sub}</p>}
              {item.label === "수강 현황" && (
                <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(course.currentStudents / course.maxStudents) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-secondary to-secondary-light rounded-full"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </MotionSection>

      {/* Instructor */}
      <MotionSection delay={0.15} className="mt-8">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl">
          <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            강사 소개
          </h3>
          <div className="flex items-center gap-4">
            {course.instructorImage ? (
              <img src={course.instructorImage} alt={course.instructorName} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
            ) : (
              <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary font-bold text-xl">
                {course.instructorName.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-extrabold text-gray-900 text-lg">{course.instructorName}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{course.rating}</span>
                <span className="text-sm text-gray-500">({course.reviewCount}개 리뷰)</span>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Curriculum */}
      <MotionSection delay={0.2} className="mt-8">
        <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2">
          <div className="p-1.5 bg-secondary/10 rounded-lg">
            <BookOpen className="w-4 h-4 text-secondary" />
          </div>
          커리큘럼 ({course.lessons.length}강)
        </h3>
        <div className="space-y-2">
          {course.lessons.map((lesson, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md hover:border-secondary/20 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 bg-gradient-to-br from-secondary/10 to-secondary/5 text-secondary rounded-xl flex items-center justify-center text-sm font-bold group-hover:from-secondary group-hover:to-secondary-dark group-hover:text-white transition-all">
                  {idx + 1}
                </span>
                <span className="font-medium text-gray-900">{lesson.title}</span>
              </div>
              <span className="text-sm text-gray-500 font-medium">{lesson.duration}분</span>
            </motion.div>
          ))}
        </div>
      </MotionSection>

      {/* Sticky CTA */}
      <MotionSection delay={0.25} className="mt-10">
        <div className="p-6 bg-white border border-gray-200 rounded-3xl shadow-xl sticky bottom-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              {course.price === 0 ? (
                <span className="text-3xl font-black bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">무료</span>
              ) : (
                <span className="text-3xl font-black text-gray-900">
                  {formatPrice(course.price)}
                  <span className="text-lg font-normal text-gray-400 ml-1">원</span>
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => alert("수강 신청이 완료되었습니다!")}
              className="px-10 py-4 bg-gradient-to-r from-secondary to-secondary-dark text-white font-semibold rounded-2xl shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-shadow btn-ripple"
            >
              수강 신청하기
            </motion.button>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
