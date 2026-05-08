"use client";

import { Calendar, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/Motion";
import { liveEvents, getPlatformInfo, formatDate } from "@/lib/mock-data";

export default function LiveSchedulePage() {
  const upcoming = liveEvents
    .filter((e) => e.status === "upcoming" || e.status === "live")
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  const grouped = upcoming.reduce<Record<string, typeof upcoming>>((acc, event) => {
    const date = new Date(event.scheduledAt).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <MotionSection>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-red-50 rounded-2xl">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">라이브 일정표</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-14">다가오는 라이브 일정을 확인하세요</p>
      </MotionSection>

      {Object.entries(grouped).length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-3xl flex items-center justify-center">
            <Calendar className="w-10 h-10 text-gray-300" />
          </div>
          <p className="text-gray-400 text-lg font-medium">예정된 라이브가 없습니다.</p>
        </motion.div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([date, events], groupIdx) => (
            <MotionSection key={date} delay={groupIdx * 0.1}>
              <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full" />
                {date}
              </h2>
              <div className="space-y-3">
                {events.map((event, idx) => {
                  const platform = getPlatformInfo(event.platform);
                  const time = new Date(event.scheduledAt).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.01, x: 4 }}
                      className={`flex items-center gap-4 p-5 bg-white border rounded-2xl shadow-sm hover:shadow-lg transition-all ${
                        event.status === "live" ? "border-red-200 ring-1 ring-red-100" : "border-gray-100"
                      }`}
                    >
                      {/* Time */}
                      <div className="text-center shrink-0 w-16">
                        <p className="text-xl font-extrabold text-gray-900">{time}</p>
                        {event.status === "live" && (
                          <span className="inline-flex items-center gap-1 text-xs text-red-500 font-bold">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse-live" />
                            LIVE
                          </span>
                        )}
                      </div>

                      {/* Divider */}
                      <div className={`w-1 h-14 rounded-full ${event.status === "live" ? "bg-gradient-to-b from-red-400 to-red-600" : "bg-gray-100"}`} />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2.5 py-0.5 ${platform.color} text-xs font-semibold rounded-lg`}>
                            {platform.name}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 truncate">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.hostName}</p>
                      </div>

                      {/* Action */}
                      {event.status === "upcoming" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => alert("카카오톡 알림이 설정되었습니다!")}
                          className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 bg-kakao text-gray-900 text-sm font-semibold rounded-xl hover:brightness-95 transition shadow-sm"
                        >
                          <Bell className="w-4 h-4" />
                          알림
                        </motion.button>
                      )}
                      {event.status === "live" && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={event.platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 px-5 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition shadow-md shadow-red-500/25"
                        >
                          시청하기
                        </motion.a>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </MotionSection>
          ))}
        </div>
      )}
    </div>
  );
}
