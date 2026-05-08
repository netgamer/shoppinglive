"use client";

import { Calendar, Clock, Bell } from "lucide-react";
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold">라이브 일정표</h1>
      </div>

      {Object.entries(grouped).length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>예정된 라이브가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, events]) => (
            <div key={date}>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full" />
                {date}
              </h2>
              <div className="space-y-3">
                {events.map((event) => {
                  const platform = getPlatformInfo(event.platform);
                  const time = new Date(event.scheduledAt).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      {/* Time */}
                      <div className="text-center shrink-0 w-16">
                        <p className="text-lg font-bold text-gray-900">{time}</p>
                        {event.status === "live" && (
                          <span className="text-xs text-red-500 font-bold">LIVE</span>
                        )}
                      </div>

                      {/* Divider */}
                      <div className={`w-1 h-14 rounded-full ${event.status === "live" ? "bg-red-500" : "bg-gray-200"}`} />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 ${platform.color} text-xs font-medium rounded`}>
                            {platform.name}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 truncate">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.hostName}</p>
                      </div>

                      {/* Action */}
                      {event.status === "upcoming" && (
                        <button
                          onClick={() => alert("카카오톡 알림이 설정되었습니다!")}
                          className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-kakao text-gray-900 text-sm font-medium rounded-lg hover:brightness-95 transition"
                        >
                          <Bell className="w-4 h-4" />
                          알림
                        </button>
                      )}
                      {event.status === "live" && (
                        <a
                          href={event.platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
                        >
                          시청하기
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
