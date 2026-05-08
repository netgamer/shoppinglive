"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Bell, Clock, Users, Tag, Share2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/Motion";
import { liveEvents, getPlatformInfo, formatDate, formatPrice } from "@/lib/mock-data";

export default function LiveDetailClient({ id }: { id: string }) {
  const event = liveEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-3xl flex items-center justify-center">
          <Tag className="w-10 h-10 text-gray-300" />
        </div>
        <p className="text-gray-500 text-lg">라이브를 찾을 수 없습니다.</p>
        <Link href="/live" className="mt-4 inline-block text-primary hover:underline font-medium">
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
    live: { text: "라이브 진행중", class: "bg-red-500 text-white", glow: "shadow-lg shadow-red-500/30" },
    upcoming: { text: "방송 예정", class: "bg-amber-500 text-white", glow: "" },
    ended: { text: "방송 종료", class: "bg-gray-500 text-white", glow: "" },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <MotionSection>
        <Link href="/live" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary mb-6 font-medium transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          라이브쇼핑 목록
        </Link>
      </MotionSection>

      {/* Hero */}
      <MotionSection>
        <div className={`aspect-video rounded-3xl bg-gradient-to-br ${bgColors[event.platform]} relative overflow-hidden shadow-2xl`}>
          {event.thumbnail ? (
            <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/20 text-[120px] font-black">{platform.icon}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <span className={`absolute top-5 left-5 px-4 py-2 ${statusLabel[event.status].class} ${statusLabel[event.status].glow} text-sm font-bold rounded-xl backdrop-blur-sm`}>
            {event.status === "live" && (
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                {statusLabel[event.status].text}
              </span>
            )}
            {event.status !== "live" && statusLabel[event.status].text}
          </span>
          <span className={`absolute top-5 right-5 px-4 py-2 ${platform.color} text-sm font-semibold rounded-xl backdrop-blur-sm`}>
            {platform.name}
          </span>

          {event.status === "live" && event.viewerCount && (
            <div className="absolute bottom-5 right-5 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md text-white text-sm rounded-xl border border-white/10">
              <Users className="w-4 h-4" />
              <span className="font-bold">{event.viewerCount.toLocaleString()}</span>명 시청중
            </div>
          )}
        </div>
      </MotionSection>

      {/* Info */}
      <MotionSection delay={0.1} className="mt-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{event.title}</h1>
        <p className="mt-3 text-gray-600 leading-relaxed text-lg">{event.description}</p>

        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            {formatDate(event.scheduledAt)}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm text-gray-600">
            <Users className="w-4 h-4 text-gray-400" />
            {event.hostName}
          </div>
        </div>
      </MotionSection>

      {/* Products */}
      {event.products && event.products.length > 0 && (
        <MotionSection delay={0.2} className="mt-10">
          <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Tag className="w-4 h-4 text-primary" />
            </div>
            판매 상품
          </h3>
          <div className="space-y-3">
            {event.products.map((product, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-bold text-gray-900">{product.name}</p>
                  {product.discount && (
                    <span className="inline-flex items-center gap-1 mt-1 text-sm text-red-500 font-bold">
                      <span className="px-1.5 py-0.5 bg-red-50 rounded text-xs">{product.discount}%</span>
                      할인
                    </span>
                  )}
                </div>
                <div className="text-right">
                  {product.discount ? (
                    <>
                      <p className="text-sm text-gray-400 line-through">{formatPrice(product.price)}원</p>
                      <p className="text-xl font-extrabold text-primary">
                        {formatPrice(Math.round(product.price * (1 - product.discount / 100)))}
                        <span className="text-sm font-normal">원</span>
                      </p>
                    </>
                  ) : (
                    <p className="text-xl font-extrabold text-gray-900">
                      {formatPrice(product.price)}
                      <span className="text-sm font-normal text-gray-500">원</span>
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </MotionSection>
      )}

      {/* Actions */}
      <MotionSection delay={0.3} className="mt-10">
        <div className="flex flex-col sm:flex-row gap-3">
          {event.status !== "ended" && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={event.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow btn-ripple"
            >
              <ExternalLink className="w-5 h-5" />
              {event.status === "live" ? "라이브 보러가기" : "플랫폼에서 보기"}
            </motion.a>
          )}
          {event.status === "upcoming" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert("카카오톡 알림이 설정되었습니다!")}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-kakao text-gray-900 font-semibold rounded-2xl shadow-md hover:brightness-95 transition btn-ripple"
            >
              <Bell className="w-5 h-5" />
              카카오톡 알림받기
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-2 font-medium"
          >
            <Share2 className="w-5 h-5" />
            공유
          </motion.button>
        </div>
      </MotionSection>
    </div>
  );
}
