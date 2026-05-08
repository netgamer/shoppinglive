"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-dark">
              Shopping<span className="text-primary">Live</span>
            </span>
          </Link>
          <p className="mt-3 text-gray-500">교육 연계 라이브쇼핑 플랫폼</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition ${
                mode === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition ${
                mode === "register" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              회원가입
            </button>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => alert("카카오 로그인은 준비 중입니다.")}
              className="w-full flex items-center justify-center gap-2 py-3 bg-kakao text-gray-900 font-medium rounded-xl hover:brightness-95 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.84 1.87 5.33 4.68 6.73l-1.19 4.37a.35.35 0 00.53.38l5.12-3.37c.28.02.56.04.86.04 5.52 0 10-3.58 10-7.94S17.52 3 12 3z" />
              </svg>
              카카오로 {mode === "login" ? "로그인" : "시작하기"}
            </button>
            <button
              onClick={() => alert("구글 로그인은 준비 중입니다.")}
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google로 {mode === "login" ? "로그인" : "시작하기"}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-400">또는</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); alert(mode === "login" ? "로그인 기능은 준비 중입니다." : "회원가입 기능은 준비 중입니다."); }}>
            {mode === "register" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이름</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="홍길동"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition"
                  />
                </div>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="8자 이상"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-dark transition"
            >
              {mode === "login" ? "로그인" : "회원가입"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
