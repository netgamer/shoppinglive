"use client";

import Link from "next/link";
import { Play, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection, MotionGrid, MotionItem } from "@/components/Motion";
import { liveEvents, getPlatformInfo, formatDate } from "@/lib/mock-data";

export default function ReplayPage() {
  const ended = liveEvents.filter((e) => e.status === "ended");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <MotionSection>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-red-50 rounded-2xl">
            <Play className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">다시보기</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-14">놓친 라이브를 다시 시청하세요</p>
      </MotionSection>

      {ended.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-3xl flex items-center justify-center">
            <Play className="w-10 h-10 text-gray-300" />
          </div>
          <p className="text-gray-400 text-lg font-medium">다시보기 가능한 라이브가 없습니다.</p>
        </motion.div>
      ) : (
        <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ended.map((event) => {
            const platform = getPlatformInfo(event.platform);
            const bgColors: Record<string, string> = {
              naver: "from-green-400 to-green-600",
              youtube: "from-red-400 to-red-600",
              tiktok: "from-gray-800 to-black",
              instagram: "from-pink-400 to-purple-600",
              zoom: "from-blue-400 to-blue-600",
            };

            return (
              <MotionItem key={event.id}>
                <Link href={`/live/${event.id}`} className="group block">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-shadow duration-500 border border-gray-100/80 card-shine"
                  >
                    <div className={`aspect-video bg-gradient-to-br ${bgColors[event.platform]} relative overflow-hidden`}>
                      {event.thumbnail ? (
                        <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white/20 text-5xl font-bold">{platform.icon}</span>
                        </div>
                      )}
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 flex items-center justify-center transition-all duration-500">
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Play className="w-7 h-7 text-gray-900 ml-1" />
                        </motion.div>
                      </div>
                      <span className={`absolute top-3 right-3 px-2.5 py-1 ${platform.color} text-xs font-semibold rounded-lg backdrop-blur-sm`}>
                        {platform.name}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-1 text-[15px]">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{event.hostName}</p>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDate(event.scheduledAt)}
                        </span>
                        {event.viewerCount && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {event.viewerCount.toLocaleString()}회
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </MotionItem>
            );
          })}
        </MotionGrid>
      )}
    </div>
  );
}
