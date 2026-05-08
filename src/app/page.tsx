"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Radio, Calendar, GraduationCap, Bell, Sparkles, TrendingUp, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionSection, MotionGrid, MotionItem } from "@/components/Motion";
import LiveCard from "@/components/LiveCard";
import CourseCard from "@/components/CourseCard";
import { banners, liveEvents, courses } from "@/lib/mock-data";

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrentBanner((prev) => (prev + dir + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const liveNow = liveEvents.filter((e) => e.status === "live");
  const upcoming = liveEvents.filter((e) => e.status === "upcoming");
  const popularCourses = courses.slice(0, 4);

  const bannerVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative h-[460px] md:h-[540px] overflow-hidden bg-dark">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={currentBanner}
            custom={direction}
            variants={bannerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="absolute inset-0"
          >
            <Link href={banners[currentBanner].linkUrl} className="block w-full h-full">
              {banners[currentBanner].image && (
                <img
                  src={banners[currentBanner].image}
                  alt={banners[currentBanner].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="max-w-xl"
                >
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-pre-line">
                    {banners[currentBanner].title}
                  </h1>
                  <p className="mt-4 text-lg md:text-xl text-white/80 leading-relaxed">
                    {banners[currentBanner].subtitle}
                  </p>
                  <motion.span
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-white text-dark font-semibold rounded-full shadow-2xl hover:shadow-white/20 transition-shadow"
                  >
                    자세히 보기
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Banner controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/25 transition border border-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex gap-2.5 items-center">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentBanner ? 1 : -1); setCurrentBanner(i); }}
                className="relative"
              >
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentBanner ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"
                }`} />
                {i === currentBanner && (
                  <motion.div
                    layoutId="banner-dot"
                    className="absolute -inset-1 border-2 border-white/50 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/25 transition border border-white/10"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <motion.div
            key={currentBanner}
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>
      </section>

      {/* Quick Stats Banner */}
      <MotionSection className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Zap, label: "실시간 라이브", value: `${liveNow.length}개 진행중`, color: "text-red-500 bg-red-50" },
              { icon: Calendar, label: "예정된 라이브", value: `${upcoming.length}개 예정`, color: "text-amber-500 bg-amber-50" },
              { icon: GraduationCap, label: "교육 과정", value: `${courses.length}개 운영`, color: "text-blue-500 bg-blue-50" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-3 md:p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-default"
              >
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-sm md:text-base font-bold text-gray-900">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* NOW LIVE */}
      {liveNow.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <MotionSection>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-2xl">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                  </span>
                  <span className="text-lg font-extrabold text-red-600 tracking-tight">NOW LIVE</span>
                </div>
                <span className="hidden sm:inline text-sm text-gray-500">실시간 진행중인 라이브</span>
              </div>
              <Link href="/live" className="group text-sm text-gray-500 hover:text-primary flex items-center gap-1 font-medium transition-colors">
                전체보기
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </MotionSection>
          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveNow.map((event) => (
              <MotionItem key={event.id}>
                <LiveCard event={event} />
              </MotionItem>
            ))}
          </MotionGrid>
        </section>
      )}

      {/* Upcoming Lives */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MotionSection>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-2xl">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span className="text-lg font-extrabold text-gray-900 tracking-tight">예정된 라이브쇼핑</span>
                </div>
                <span className="hidden sm:inline text-sm text-gray-500">알림 신청하고 놓치지 마세요!</span>
              </div>
              <Link href="/live/schedule" className="group text-sm text-gray-500 hover:text-primary flex items-center gap-1 font-medium transition-colors">
                일정보기
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </MotionSection>
          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcoming.map((event) => (
              <MotionItem key={event.id}>
                <LiveCard event={event} />
              </MotionItem>
            ))}
          </MotionGrid>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <MotionSection>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-2xl">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span className="text-lg font-extrabold text-gray-900 tracking-tight">인기 교육 프로그램</span>
              </div>
              <span className="hidden sm:inline text-sm text-gray-500">IUC 남가주대학교 공인 과정</span>
            </div>
            <Link href="/education" className="group text-sm text-gray-500 hover:text-secondary flex items-center gap-1 font-medium transition-colors">
              전체보기
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </MotionSection>
        <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCourses.map((course) => (
            <MotionItem key={course.id}>
              <CourseCard course={course} />
            </MotionItem>
          ))}
        </MotionGrid>
      </section>

      {/* CTA Banner */}
      <MotionSection>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark-medium" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/70 text-sm mb-6 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-4 h-4" />
                카카오톡으로 간편하게
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                라이브쇼핑 알림을<br />카카오톡으로 받아보세요
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
                관심있는 라이브쇼핑에 알림 신청을 하면, 시작 전 카카오톡으로 알려드립니다.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/live">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-shadow btn-ripple"
                  >
                    <Bell className="w-5 h-5" />
                    라이브쇼핑 둘러보기
                  </motion.span>
                </Link>
                <Link href="/education">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/15 transition border border-white/10"
                  >
                    <GraduationCap className="w-5 h-5" />
                    교육과정 살펴보기
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </MotionSection>
    </div>
  );
}
