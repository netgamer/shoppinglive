import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Shopping<span className="text-primary">Live</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              IUC 남가주대학교에서 주최하는<br />
              교육 연계 라이브쇼핑 플랫폼
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">라이브쇼핑</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/live" className="hover:text-white transition-colors">전체 라이브</Link></li>
              <li><Link href="/live/schedule" className="hover:text-white transition-colors">라이브 일정</Link></li>
              <li><Link href="/live/replay" className="hover:text-white transition-colors">다시보기</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">교육프로그램</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/education" className="hover:text-white transition-colors">전체 교육</Link></li>
              <li><Link href="/education/my" className="hover:text-white transition-colors">내 수강목록</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mypage" className="hover:text-white transition-colors">마이페이지</Link></li>
              <li><span className="cursor-default">이용약관</span></li>
              <li><span className="cursor-default">개인정보처리방침</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>IUC University of Southern California | 사업자등록번호: 000-00-00000</p>
          <p className="mt-1">&copy; 2026 ShoppingLive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
