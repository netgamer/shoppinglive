"use client";

import { useState } from "react";
import { Radio, Filter } from "lucide-react";
import LiveCard from "@/components/LiveCard";
import { liveEvents } from "@/lib/mock-data";

const platformFilters = [
  { key: "all", label: "전체" },
  { key: "naver", label: "네이버" },
  { key: "youtube", label: "YouTube" },
  { key: "tiktok", label: "TikTok" },
  { key: "instagram", label: "Instagram" },
  { key: "zoom", label: "Zoom" },
];

const statusFilters = [
  { key: "all", label: "전체" },
  { key: "live", label: "라이브 중" },
  { key: "upcoming", label: "예정" },
  { key: "ended", label: "종료" },
];

export default function LivePage() {
  const [platform, setPlatform] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = liveEvents.filter((e) => {
    if (platform !== "all" && e.platform !== platform) return false;
    if (status !== "all" && e.status !== status) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Radio className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold">라이브쇼핑</h1>
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-600 mr-2">플랫폼:</span>
          {platformFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setPlatform(f.key)}
              className={`px-3 py-1.5 text-sm rounded-full transition ${
                platform === f.key
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-600 mr-2">상태:</span>
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setStatus(f.key)}
              className={`px-3 py-1.5 text-sm rounded-full transition ${
                status === f.key
                  ? "bg-secondary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Radio className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>해당 조건의 라이브가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <LiveCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
