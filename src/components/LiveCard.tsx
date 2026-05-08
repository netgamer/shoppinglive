import Link from "next/link";
import { Clock, Users, Bell } from "lucide-react";
import { type LiveEvent, getPlatformInfo, formatDate } from "@/lib/mock-data";

export default function LiveCard({ event }: { event: LiveEvent }) {
  const platform = getPlatformInfo(event.platform);

  const statusBadge = {
    live: (
      <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />
        LIVE
      </span>
    ),
    upcoming: (
      <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
        예정
      </span>
    ),
    ended: (
      <span className="absolute top-3 left-3 px-2.5 py-1 bg-gray-500 text-white text-xs font-bold rounded-full">
        종료
      </span>
    ),
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
      <div className="relative rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
        {/* Thumbnail */}
        <div className={`aspect-video bg-gradient-to-br ${bgColors[event.platform]} relative overflow-hidden`}>
          {event.thumbnail ? (
            <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/90 text-5xl font-bold">{platform.icon}</span>
            </div>
          )}
        </div>

        {statusBadge[event.status]}

        {/* Platform badge */}
        <span className={`absolute top-3 right-3 px-2 py-1 ${platform.color} text-xs font-medium rounded-md`}>
          {platform.name}
        </span>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{event.hostName}</p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(event.scheduledAt)}
            </div>
            {event.status === "live" && event.viewerCount && (
              <div className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <Users className="w-3.5 h-3.5" />
                {event.viewerCount.toLocaleString()}명 시청
              </div>
            )}
          </div>

          {event.status === "upcoming" && (
            <button
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 bg-kakao text-gray-900 text-sm font-medium rounded-lg hover:brightness-95 transition"
              onClick={(e) => {
                e.preventDefault();
                alert("카카오톡 알림이 설정되었습니다!");
              }}
            >
              <Bell className="w-4 h-4" />
              카카오톡 알림받기
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
