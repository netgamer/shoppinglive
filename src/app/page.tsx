"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Radio, Calendar, GraduationCap, Bell } from "lucide-react";
import LiveCard from "@/components/LiveCard";
import CourseCard from "@/components/CourseCard";
import { banners, liveEvents, courses } from "@/lib/mock-data";

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const liveNow = liveEvents.filter((e) => e.status === "live");
  const upcoming = liveEvents.filter((e) => e.status === "upcoming");
  const popularCourses = courses.slice(0, 4);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[420px] md:h-[480px] overflow-hidden">
        {banners.map((banner, i) => (
          <Link
            key={banner.id}
            href={banner.linkUrl}
            className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} transition-opacity duration-700 flex items-center ${
              i === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {banner.image && (
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
              />
            )}
            <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
              <div className="max-w-xl">
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight whitespace-pre-line">
                  {banner.title}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/80">{banner.subtitle}</p>
                <span className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white/20 backdrop-blur text-white font-medium rounded-full hover:bg-white/30 transition">
                  자세히 보기 <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* Banner controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <button
            onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
            className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  i === currentBanner ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
            className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* NOW LIVE */}
      {liveNow.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full">
                <Radio className="w-5 h-5 text-red-500 animate-pulse-live" />
                <span className="text-lg font-bold text-red-600">NOW LIVE</span>
              </div>
              <span className="text-sm text-gray-500">실시간 진행중인 라이브</span>
            </div>
            <Link href="/live" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
              전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveNow.map((event) => (
              <LiveCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Lives */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span className="text-lg font-bold text-gray-900">예정된 라이브쇼핑</span>
              </div>
              <span className="text-sm text-gray-500">알림 신청하고 놓치지 마세요!</span>
            </div>
            <Link href="/live/schedule" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
              일정보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcoming.map((event) => (
              <LiveCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
              <GraduationCap className="w-5 h-5 text-secondary" />
              <span className="text-lg font-bold text-gray-900">인기 교육 프로그램</span>
            </div>
            <span className="text-sm text-gray-500">IUC 남가주대학교 공인 과정</span>
          </div>
          <Link href="/education" className="text-sm text-gray-500 hover:text-secondary flex items-center gap-1">
            전체보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-dark to-dark-light py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            라이브쇼핑 알림을 카카오톡으로 받아보세요
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">
            관심있는 라이브쇼핑에 알림 신청을 하면, 시작 전 카카오톡으로 알려드립니다.
            네이버, 유튜브, 틱톡 어디서든 바로 연결!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/live"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition"
            >
              <Bell className="w-5 h-5" />
              라이브쇼핑 둘러보기
            </Link>
            <Link
              href="/education"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition"
            >
              <GraduationCap className="w-5 h-5" />
              교육과정 살펴보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
