export interface LiveEvent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  platform: "naver" | "youtube" | "tiktok" | "instagram" | "zoom";
  platformUrl: string;
  status: "upcoming" | "live" | "ended";
  scheduledAt: string;
  viewerCount?: number;
  hostName: string;
  products?: { name: string; price: number; discount?: number }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  instructorName: string;
  instructorImage: string;
  type: "vod" | "live" | "offline" | "hybrid";
  price: number;
  maxStudents: number;
  currentStudents: number;
  rating: number;
  reviewCount: number;
  startDate: string;
  endDate: string;
  lessons: { title: string; duration: number }[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  linkUrl: string;
  bgColor: string;
}

export const banners: Banner[] = [
  {
    id: "1",
    title: "IUC 남가주대학교\n라이브커머스 실전 과정",
    subtitle: "교육과 쇼핑이 만나는 새로운 경험",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop",
    linkUrl: "/education/1",
    bgColor: "from-blue-600 to-indigo-800",
  },
  {
    id: "2",
    title: "오늘 밤 8시\n특별 라이브 쇼핑",
    subtitle: "최대 70% 할인 + 카카오톡 알림 받기",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=600&fit=crop",
    linkUrl: "/live",
    bgColor: "from-red-500 to-pink-600",
  },
  {
    id: "3",
    title: "디지털 마케팅\n마스터 클래스",
    subtitle: "현업 전문가와 함께하는 8주 과정",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    linkUrl: "/education/2",
    bgColor: "from-emerald-500 to-teal-700",
  },
];

export const liveEvents: LiveEvent[] = [
  {
    id: "1",
    title: "봄맞이 뷰티 특집 라이브",
    description: "인기 스킨케어 브랜드 최대 60% 할인! 라이브 한정 특가 상품을 만나보세요.",
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
    platform: "naver",
    platformUrl: "https://shoppinglive.naver.com",
    status: "live",
    scheduledAt: "2026-05-08T19:00:00",
    viewerCount: 1247,
    hostName: "뷰티마스터 김소연",
    products: [
      { name: "프리미엄 세럼 50ml", price: 89000, discount: 30 },
      { name: "모이스처 크림 100ml", price: 65000, discount: 25 },
    ],
  },
  {
    id: "2",
    title: "건강식품 직접 만들기 라이브",
    description: "전문 영양사와 함께하는 건강식품 만들기 라이브입니다.",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    platform: "youtube",
    platformUrl: "https://youtube.com/live",
    status: "live",
    scheduledAt: "2026-05-08T20:00:00",
    viewerCount: 832,
    hostName: "영양사 박민정",
    products: [
      { name: "유기농 그래놀라 세트", price: 35000, discount: 20 },
    ],
  },
  {
    id: "3",
    title: "틱톡 트렌드 패션 라이브",
    description: "MZ세대 핫 아이템 총집합! 틱톡에서 화제인 패션 아이템을 소개합니다.",
    thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
    platform: "tiktok",
    platformUrl: "https://tiktok.com/live",
    status: "upcoming",
    scheduledAt: "2026-05-09T14:00:00",
    hostName: "패션 인플루언서 이지우",
    products: [
      { name: "트렌디 크로스백", price: 49000, discount: 15 },
      { name: "빈티지 선글라스", price: 29000 },
    ],
  },
  {
    id: "4",
    title: "주방용품 특가 라이브",
    description: "프리미엄 주방용품을 특별가에 만나보세요.",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    platform: "naver",
    platformUrl: "https://shoppinglive.naver.com",
    status: "upcoming",
    scheduledAt: "2026-05-09T19:00:00",
    hostName: "리빙 전문가 최다혜",
    products: [
      { name: "스테인리스 프라이팬 세트", price: 120000, discount: 40 },
    ],
  },
  {
    id: "5",
    title: "인스타 감성 홈데코 라이브",
    description: "인스타그램 인기 인테리어 소품을 라이브로 만나보세요.",
    thumbnail: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&h=400&fit=crop",
    platform: "instagram",
    platformUrl: "https://instagram.com/live",
    status: "upcoming",
    scheduledAt: "2026-05-10T15:00:00",
    hostName: "인테리어 디자이너 한서영",
    products: [
      { name: "캔들 홀더 세트", price: 38000, discount: 10 },
    ],
  },
  {
    id: "6",
    title: "Zoom 라이브 쿠킹클래스 & 식재료 판매",
    description: "줌으로 함께 요리하면서 엄선된 식재료를 구매하세요.",
    thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop",
    platform: "zoom",
    platformUrl: "https://zoom.us/meeting",
    status: "upcoming",
    scheduledAt: "2026-05-11T11:00:00",
    hostName: "셰프 이준혁",
    products: [
      { name: "프리미엄 식재료 박스", price: 55000, discount: 20 },
    ],
  },
  {
    id: "7",
    title: "지난주 뷰티 베스트 라이브",
    description: "지난주 가장 인기있었던 뷰티 라이브 다시보기",
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop",
    platform: "youtube",
    platformUrl: "https://youtube.com/watch",
    status: "ended",
    scheduledAt: "2026-05-01T20:00:00",
    viewerCount: 5430,
    hostName: "뷰티 크리에이터 정아름",
  },
  {
    id: "8",
    title: "헬스 보충제 특가 라이브",
    description: "운동인들을 위한 보충제 특가 라이브 다시보기",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    platform: "naver",
    platformUrl: "https://shoppinglive.naver.com",
    status: "ended",
    scheduledAt: "2026-05-03T19:00:00",
    viewerCount: 3210,
    hostName: "피트니스 코치 강민호",
  },
];

export const courses: Course[] = [
  {
    id: "1",
    title: "라이브커머스 실전 마스터 과정",
    description: "IUC 남가주대학교 공식 인증 과정. 라이브커머스의 기획부터 실전 방송까지 체계적으로 배울 수 있습니다. 현업 전문가의 노하우를 직접 전수받으세요.",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    category: "라이브커머스 실전",
    instructorName: "김태현 교수",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    type: "hybrid",
    price: 890000,
    maxStudents: 30,
    currentStudents: 24,
    rating: 4.9,
    reviewCount: 128,
    startDate: "2026-05-15",
    endDate: "2026-07-10",
    lessons: [
      { title: "라이브커머스 시장 이해", duration: 60 },
      { title: "방송 기획 및 스크립트 작성", duration: 90 },
      { title: "카메라 세팅과 조명", duration: 60 },
      { title: "실전 라이브 방송 실습", duration: 120 },
      { title: "데이터 분석과 개선", duration: 60 },
      { title: "플랫폼별 전략 (네이버/유튜브/틱톡)", duration: 90 },
      { title: "고객 소통 스킬", duration: 60 },
      { title: "최종 프로젝트 발표", duration: 120 },
    ],
  },
  {
    id: "2",
    title: "디지털 마케팅 전략 A to Z",
    description: "SNS 마케팅, 퍼포먼스 마케팅, 콘텐츠 마케팅까지. 디지털 마케팅의 전 영역을 8주간 마스터합니다.",
    thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    category: "마케팅/브랜딩",
    instructorName: "이수진 대표",
    instructorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    type: "vod",
    price: 590000,
    maxStudents: 100,
    currentStudents: 67,
    rating: 4.7,
    reviewCount: 89,
    startDate: "2026-05-20",
    endDate: "2026-07-15",
    lessons: [
      { title: "디지털 마케팅 트렌드 2026", duration: 45 },
      { title: "타겟 고객 분석", duration: 60 },
      { title: "SNS 채널 전략", duration: 50 },
      { title: "콘텐츠 기획과 제작", duration: 70 },
      { title: "광고 플랫폼 활용법", duration: 60 },
      { title: "데이터 기반 마케팅", duration: 55 },
    ],
  },
  {
    id: "3",
    title: "1인 창업 부트캠프",
    description: "아이디어부터 사업자 등록, 첫 매출까지. 창업의 전 과정을 실습 위주로 진행합니다.",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    category: "비즈니스/창업",
    instructorName: "박성민 대표",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    type: "offline",
    price: 1200000,
    maxStudents: 20,
    currentStudents: 18,
    rating: 4.8,
    reviewCount: 56,
    startDate: "2026-06-01",
    endDate: "2026-08-30",
    lessons: [
      { title: "창업 아이디어 발굴", duration: 120 },
      { title: "비즈니스 모델 수립", duration: 90 },
      { title: "사업계획서 작성", duration: 120 },
      { title: "자금 조달 전략", duration: 90 },
      { title: "마케팅과 세일즈", duration: 120 },
    ],
  },
  {
    id: "4",
    title: "영상 편집 & 숏폼 제작",
    description: "프리미어 프로와 캡컷을 활용한 영상 편집 기초부터 숏폼 콘텐츠 제작까지.",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
    category: "IT/디지털",
    instructorName: "정우성 PD",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    type: "vod",
    price: 390000,
    maxStudents: 200,
    currentStudents: 143,
    rating: 4.6,
    reviewCount: 201,
    startDate: "2026-05-10",
    endDate: "2026-06-30",
    lessons: [
      { title: "영상 편집 기초 (프리미어 프로)", duration: 60 },
      { title: "컷 편집과 전환 효과", duration: 45 },
      { title: "자막과 텍스트 디자인", duration: 40 },
      { title: "숏폼 콘텐츠 기획", duration: 50 },
      { title: "캡컷 활용 모바일 편집", duration: 55 },
      { title: "음악과 사운드 디자인", duration: 40 },
    ],
  },
  {
    id: "5",
    title: "글로벌 셀러 양성 과정",
    description: "아마존, 쇼피, 알리익스프레스 등 해외 플랫폼 진출을 위한 실전 과정입니다.",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
    category: "비즈니스/창업",
    instructorName: "Sarah Kim",
    instructorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    type: "live",
    price: 750000,
    maxStudents: 25,
    currentStudents: 19,
    rating: 4.9,
    reviewCount: 42,
    startDate: "2026-06-10",
    endDate: "2026-08-10",
    lessons: [
      { title: "글로벌 이커머스 트렌드", duration: 60 },
      { title: "아마존 FBA 입문", duration: 90 },
      { title: "상품 소싱과 물류", duration: 75 },
      { title: "글로벌 마케팅 전략", duration: 60 },
    ],
  },
  {
    id: "6",
    title: "TOEIC Speaking 집중반",
    description: "4주 집중 과정으로 토익 스피킹 레벨 7 이상을 목표로 합니다.",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=400&fit=crop",
    category: "어학/글로벌",
    instructorName: "제임스 리",
    instructorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    type: "live",
    price: 450000,
    maxStudents: 15,
    currentStudents: 12,
    rating: 4.5,
    reviewCount: 78,
    startDate: "2026-05-25",
    endDate: "2026-06-22",
    lessons: [
      { title: "발음 교정 & 기초 표현", duration: 60 },
      { title: "사진 묘사 전략", duration: 50 },
      { title: "의견 제시 패턴", duration: 55 },
      { title: "실전 모의고사", duration: 60 },
    ],
  },
];

export const categories = [
  "전체",
  "비즈니스/창업",
  "마케팅/브랜딩",
  "라이브커머스 실전",
  "IT/디지털",
  "자격증/취업",
  "어학/글로벌",
];

export function getPlatformInfo(platform: LiveEvent["platform"]) {
  const map = {
    naver: { name: "네이버 쇼핑라이브", color: "bg-naver text-white", icon: "N" },
    youtube: { name: "YouTube Live", color: "bg-youtube text-white", icon: "Y" },
    tiktok: { name: "TikTok Live", color: "bg-tiktok text-white", icon: "T" },
    instagram: { name: "Instagram Live", color: "bg-instagram text-white", icon: "I" },
    zoom: { name: "Zoom Live", color: "bg-zoom text-white", icon: "Z" },
  };
  return map[platform];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR").format(price);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getTypeLabel(type: Course["type"]): string {
  const map = { vod: "VOD", live: "실시간", offline: "오프라인", hybrid: "온·오프라인" };
  return map[type];
}
