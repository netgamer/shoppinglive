"use client";

import Link from "next/link";
import { Clock, Users, Bell, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { type LiveEvent, getPlatformInfo, formatDate } from "@/lib/mock-data";

export default function LiveCard({ event }: { event: LiveEvent }) {
  const platform = getPlatformInfo(event.platform);

  const statusConfig = {
    live: {
      badge: (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg shadow-red-600/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          LIVE
        </span>
      ),
      ring: "ring-2 ring-red-500/30",
    },
    upcoming: {
      badge: (
        <span className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
          예정
        </span>
      ),
      ring: "",
    },
    ended: {
      badge: (
        <span className="px-3 py-1 bg-gray-600/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
          종료
        </span>
      ),
      ring: "",
    },
  };

  const bgColors: Record<string, string> = {
    naver: "from-green-400 to-green-600",
    youtube: "from-red-400 to-red-600",
    tiktok: "from-gray-800 to-black",
    instagram: "from-pink-400 to-purple-600",
    zoom: "from-blue-400 to-blue-600",
  };

  return (
    <Link href={`/live/${event.id}`} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-shadow duration-500 card-shine ${statusConfig[event.status].ring}`}
      >
        {/* Thumbnail */}
        <div className={`aspect-video bg-gradient-to-br ${bgColors[event.platform]} relative overflow-hidden`}>
          {event.thumbnail ? (
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/90 text-5xl font-bold">{platform.icon}</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          <div className="absolute top-3 left-3 z-10">
            {statusConfig[event.status].badge}
          </div>
          <span className={`absolute top-3 right-3 z-10 px-2.5 py-1 ${platform.color} text-xs font-semibold rounded-lg shadow-sm backdrop-blur-sm`}>
            {platform.name}
          </span>

          {/* Live viewer count overlay */}
          {event.status === "live" && event.viewerCount && (
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              <Users className="w-3.5 h-3.5" />
              {event.viewerCount.toLocaleString()}명
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-1 text-[15px]">
            {event.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{event.hostName}</p>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(event.scheduledAt)}
            </div>
            {event.status === "live" && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500">
                <ExternalLink className="w-3 h-3" />
                시청하기
              </span>
            )}
          </div>

          {event.status === "upcoming" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 bg-kakao text-gray-900 text-sm font-semibold rounded-xl hover:brightness-95 transition shadow-sm btn-ripple"
              onClick={(e) => {
                e.preventDefault();
                alert("카카오톡 알림이 설정되었습니다!");
              }}
            >
              <Bell className="w-4 h-4" />
              카카오톡 알림받기
            </motion.button>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
