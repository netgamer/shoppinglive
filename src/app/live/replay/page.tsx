"use client";

import Link from "next/link";
import { Play, Clock, Users, Eye } from "lucide-react";
import { liveEvents, getPlatformInfo, formatDate } from "@/lib/mock-data";

export default function ReplayPage() {
  const ended = liveEvents.filter((e) => e.status === "ended");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Play className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold">다시보기</h1>
      </div>

      {ended.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Play className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>다시보기 가능한 라이브가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Link key={event.id} href={`/live/${event.id}`} className="group block">
                <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border border-gray-100">
                  <div className={`aspect-video bg-gradient-to-br ${bgColors[event.platform]} relative overflow-hidden`}>
                    {event.thumbnail ? (
                      <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/20 text-5xl font-bold">{platform.icon}</span>
                      </div>
                    )}
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-gray-900 ml-1" />
                      </div>
                    </div>
                    <span className={`absolute top-3 right-3 px-2 py-1 ${platform.color} text-xs font-medium rounded-md`}>
                      {platform.name}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{event.hostName}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
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
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
