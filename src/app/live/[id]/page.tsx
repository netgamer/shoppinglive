"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Bell, Clock, Users, Tag, Share2 } from "lucide-react";
import { liveEvents, getPlatformInfo, formatDate, formatPrice } from "@/lib/mock-data";

export default function LiveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const event = liveEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">라이브를 찾을 수 없습니다.</p>
        <Link href="/live" className="mt-4 inline-block text-primary hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const platform = getPlatformInfo(event.platform);

  const bgColors: Record<string, string> = {
    naver: "from-green-400 to-green-600",
    youtube: "from-red-400 to-red-600",
    tiktok: "from-gray-800 to-black",
    instagram: "from-pink-400 to-purple-600",
    zoom: "from-blue-400 to-blue-600",
  };

  const statusLabel = {
    live: { text: "라이브 진행중", class: "bg-red-100 text-red-700" },
    upcoming: { text: "방송 예정", class: "bg-amber-100 text-amber-700" },
    ended: { text: "방송 종료", class: "bg-gray-100 text-gray-700" },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/live" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> 라이브쇼핑 목록
      </Link>

      {/* Hero */}
      <div className={`aspect-video rounded-2xl bg-gradient-to-br ${bgColors[event.platform]} flex items-center justify-center relative overflow-hidden`}>
        <span className="text-white/20 text-[120px] font-black">{platform.icon}</span>
        <span className={`absolute top-4 left-4 px-3 py-1.5 ${statusLabel[event.status].class} text-sm font-bold rounded-full`}>
          {statusLabel[event.status].text}
        </span>
        <span className={`absolute top-4 right-4 px-3 py-1.5 ${platform.color} text-sm font-medium rounded-lg`}>
          {platform.name}
        </span>

        {event.status === "live" && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-live" />
            LIVE
            {event.viewerCount && (
              <>
                <span className="mx-1">|</span>
                <Users className="w-3.5 h-3.5" />
                {event.viewerCount.toLocaleString()}명
              </>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{event.title}</h1>
        <p className="mt-2 text-gray-600">{event.description}</p>

        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {formatDate(event.scheduledAt)}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            {event.hostName}
          </div>
        </div>

        {/* Products */}
        {event.products && event.products.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              판매 상품
            </h3>
            <div className="space-y-3">
              {event.products.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    {product.discount && (
                      <span className="text-sm text-red-500 font-bold">{product.discount}% 할인</span>
                    )}
                  </div>
                  <div className="text-right">
                    {product.discount ? (
                      <>
                        <p className="text-sm text-gray-400 line-through">{formatPrice(product.price)}원</p>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(Math.round(product.price * (1 - product.discount / 100)))}원
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}원</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {event.status !== "ended" && (
            <a
              href={event.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition"
            >
              <ExternalLink className="w-5 h-5" />
              {event.status === "live" ? "라이브 보러가기" : "플랫폼에서 보기"}
            </a>
          )}
          {event.status === "upcoming" && (
            <button
              onClick={() => alert("카카오톡 알림이 설정되었습니다!")}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-kakao text-gray-900 font-semibold rounded-xl hover:brightness-95 transition"
            >
              <Bell className="w-5 h-5" />
              카카오톡 알림받기
            </button>
          )}
          <button className="px-6 py-3.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            공유
          </button>
        </div>
      </div>
    </div>
  );
}
