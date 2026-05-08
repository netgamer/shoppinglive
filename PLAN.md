# ShoppingLive - 교육 + 라이브쇼핑 통합 플랫폼

## 프로젝트 개요

IUC 남가주대학교에서 주최하는 교육 프로그램 기반의 **교육 + 라이브쇼핑 통합 서비스**.
ClassU(교육 플랫폼)와 네이버 쇼핑라이브(라이브커머스)를 결합한 형태.

> **핵심 컨셉**: 교육을 통해 배우고, 라이브쇼핑으로 실전 연계하는 원스톱 플랫폼

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| UI 컴포넌트 | shadcn/ui + Radix UI |
| 상태관리 | Zustand |
| Backend/DB | Supabase (Auth, Database, Storage, Realtime) |
| 알림 | 카카오톡 알림톡 API (비즈메시지) |
| 영상 | YouTube/Naver Live 임베드, Zoom SDK |
| 배포 | Vercel |
| 패키지매니저 | pnpm |

---

## 사이트맵

```
/                          → 홈 (배너 + 라이브예고 + 인기교육)
├── /live                  → 라이브쇼핑 홈
│   ├── /live/schedule     → 라이브 일정표 (캘린더 뷰)
│   ├── /live/[id]         → 라이브 상세 (플랫폼 연결)
│   └── /live/replay       → 다시보기
├── /education             → 교육 홈
│   ├── /education/[id]    → 교육 상세/신청
│   ├── /education/my      → 내 수강목록
│   └── /education/live    → 실시간 교육 (Zoom)
├── /mypage                → 마이페이지
│   ├── /mypage/alerts     → 알림 설정
│   └── /mypage/history    → 참여 이력
├── /auth                  → 로그인/회원가입
└── /admin                 → 관리자 대시보드
    ├── /admin/live        → 라이브 관리
    ├── /admin/education   → 교육 관리
    └── /admin/users       → 회원 관리
```

---

## 주요 기능 상세

### 1. 홈페이지 (`/`)

```
┌─────────────────────────────────────────────┐
│  [Header] 로고 | 교육 | 라이브쇼핑 | 마이페이지  │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐    │
│  │     히어로 배너 슬라이더 (3~5개)      │    │
│  │   교육프로그램 / 라이브쇼핑 홍보       │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  🔴 NOW LIVE  실시간 진행중인 라이브         │
│  ┌────┐ ┌────┐ ┌────┐                      │
│  │Live│ │Live│ │Live│  ← 가로 스크롤        │
│  └────┘ └────┘ └────┘                      │
│                                             │
│  📅 예정된 라이브쇼핑                        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│  │예고│ │예고│ │예고│ │예고│  ← 알림신청 버튼 │
│  └────┘ └────┘ └────┘ └────┘              │
│                                             │
│  📚 인기 교육 프로그램                       │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│  │교육│ │교육│ │교육│ │교육│               │
│  └────┘ └────┘ └────┘ └────┘              │
│                                             │
│  [Footer]                                   │
└─────────────────────────────────────────────┘
```

### 2. 라이브쇼핑 시스템

#### 라이브 플랫폼 연동
- **네이버 쇼핑라이브** → 네이버 라이브 URL 연결
- **YouTube Live** → 유튜브 라이브 URL 연결
- **TikTok Live** → 틱톡 라이브 URL 연결
- **Instagram Live** → 인스타 라이브 URL 연결
- **자체 Zoom 라이브** → Zoom 미팅 링크 연결

#### 라이브 상태 관리
```
[예고] → [알림발송] → [라이브중] → [종료] → [다시보기]
```

#### 라이브 카드 정보
- 썸네일 이미지
- 라이브 제목
- 진행 플랫폼 아이콘 (네이버/유튜브/틱톡 등)
- 예정 일시
- 알림 신청 버튼 (카카오톡)
- 라이브 상태 뱃지 (예고/진행중/종료)

### 3. 카카오톡 알림 시스템

#### 플로우
```
사용자가 라이브 알림 신청
    ↓
카카오 로그인 (OAuth) 으로 연동
    ↓
라이브 시작 30분 전, 카카오톡 알림톡 발송
    ↓
알림톡 내 버튼 클릭
    ↓
해당 플랫폼 라이브 링크로 이동
  (네이버 → 네이버 / 유튜브 → 유튜브 / 틱톡 → 틱톡)
```

#### 알림톡 템플릿
```
[IUC 쇼핑라이브] 알림

🔴 {라이브 제목}이 곧 시작됩니다!

📅 {날짜} {시간}
📍 {플랫폼명}에서 진행

[라이브 보러가기] ← 해당 플랫폼 링크
```

### 4. 교육 시스템

#### 교육 유형
| 유형 | 설명 | 수강 방식 |
|------|------|-----------|
| VOD | 녹화된 영상 교육 | 사이트 내 영상 플레이어 |
| LIVE | 실시간 온라인 교육 | Zoom 연동 |
| OFFLINE | 오프라인 현장 교육 | 장소/시간 안내 + 참가신청 |
| HYBRID | 온·오프라인 병행 | 선택 가능 |

#### 교육 상세 페이지
- 교육 배너 이미지
- 교육 제목 / 카테고리
- 강사 정보
- 교육 일정 (기간, 시간)
- 교육 방식 (VOD/LIVE/OFFLINE)
- 커리큘럼 목록
- 수강 신청 버튼
- 수강료 (무료/유료)
- 수강 인원 / 정원

#### 교육 카테고리 (IUC 기반)
- 비즈니스/창업
- 마케팅/브랜딩
- 라이브커머스 실전
- IT/디지털
- 자격증/취업
- 어학/글로벌

### 5. 사용자 인증

- **카카오 로그인** (필수 - 알림톡 연동)
- **구글 로그인** (선택)
- **이메일 회원가입** (선택)

---

## 데이터베이스 스키마 (Supabase)

### users
```sql
id              UUID PK
email           TEXT
name            TEXT
avatar_url      TEXT
kakao_id        TEXT          -- 카카오 연동 ID
phone           TEXT          -- 알림톡 발송용
role            ENUM(user, admin)
created_at      TIMESTAMPTZ
```

### live_events (라이브쇼핑)
```sql
id              UUID PK
title           TEXT
description     TEXT
thumbnail_url   TEXT
platform        ENUM(naver, youtube, tiktok, instagram, zoom)
platform_url    TEXT          -- 해당 플랫폼 라이브 링크
status          ENUM(upcoming, live, ended)
scheduled_at    TIMESTAMPTZ
ended_at        TIMESTAMPTZ
replay_url      TEXT
created_by      UUID FK → users
created_at      TIMESTAMPTZ
```

### live_alerts (라이브 알림 신청)
```sql
id              UUID PK
user_id         UUID FK → users
live_event_id   UUID FK → live_events
alerted         BOOLEAN DEFAULT false
created_at      TIMESTAMPTZ
```

### courses (교육 프로그램)
```sql
id              UUID PK
title           TEXT
description     TEXT
thumbnail_url   TEXT
category        TEXT
instructor_name TEXT
instructor_bio  TEXT
type            ENUM(vod, live, offline, hybrid)
price           INTEGER DEFAULT 0
max_students    INTEGER
location        TEXT          -- 오프라인인 경우
zoom_link       TEXT          -- 라이브인 경우
start_date      DATE
end_date        DATE
status          ENUM(upcoming, ongoing, ended)
created_at      TIMESTAMPTZ
```

### course_lessons (교육 커리큘럼)
```sql
id              UUID PK
course_id       UUID FK → courses
title           TEXT
description     TEXT
video_url       TEXT          -- VOD URL
order_num       INTEGER
duration        INTEGER       -- 분 단위
```

### enrollments (수강 신청)
```sql
id              UUID PK
user_id         UUID FK → users
course_id       UUID FK → courses
status          ENUM(enrolled, completed, cancelled)
progress        INTEGER DEFAULT 0  -- 진행률 %
enrolled_at     TIMESTAMPTZ
```

### banners (홈 배너)
```sql
id              UUID PK
title           TEXT
image_url       TEXT
link_url        TEXT
link_type       ENUM(live, course, external)
order_num       INTEGER
is_active       BOOLEAN DEFAULT true
created_at      TIMESTAMPTZ
```

---

## 구현 단계 (Phase)

### Phase 1: 기반 구축 (Week 1)
- [x] 프로젝트 계획 수립
- [ ] Next.js + TypeScript + Tailwind 프로젝트 초기화
- [ ] shadcn/ui 컴포넌트 설정
- [ ] Supabase 프로젝트 생성 및 DB 스키마 구성
- [ ] 공통 레이아웃 (Header, Footer, Navigation)
- [ ] 카카오/구글 OAuth 로그인

### Phase 2: 홈 + 교육 (Week 2)
- [ ] 홈페이지 히어로 배너 슬라이더
- [ ] 교육 목록 페이지 (카테고리 필터링)
- [ ] 교육 상세 페이지
- [ ] 수강 신청 기능
- [ ] VOD 영상 플레이어
- [ ] 내 수강목록 페이지

### Phase 3: 라이브쇼핑 (Week 3)
- [ ] 라이브쇼핑 목록 페이지
- [ ] 라이브 상세 페이지 (플랫폼 연결)
- [ ] 라이브 일정 캘린더
- [ ] 라이브 상태 관리 (예고/진행중/종료)
- [ ] 다시보기 페이지
- [ ] 홈페이지 라이브 섹션 연동

### Phase 4: 알림 시스템 (Week 4)
- [ ] 카카오톡 비즈메시지 연동
- [ ] 알림 신청/취소 기능
- [ ] 알림톡 템플릿 등록 및 발송
- [ ] 알림 스케줄러 (라이브 시작 전 자동 발송)

### Phase 5: 관리자 + 마무리 (Week 5)
- [ ] 관리자 대시보드
- [ ] 라이브/교육 CRUD 관리
- [ ] 배너 관리
- [ ] 회원 관리
- [ ] 반응형 모바일 최적화
- [ ] SEO + 성능 최적화
- [ ] 배포 (Vercel)

---

## 디자인 가이드

### 컬러 팔레트
```
Primary:    #FF4D4F (레드 - 라이브/활동적)
Secondary:  #1890FF (블루 - 교육/신뢰)
Accent:     #FFC107 (옐로우 - 강조/알림)
Dark:       #1A1A2E (다크 네이비)
Light:      #F8F9FA (라이트 그레이)
White:      #FFFFFF
```

### 폰트
- 한글: Pretendard
- 영문: Inter
- 숫자/강조: Montserrat

### 핵심 UI 요소
- 라이브 상태 뱃지: 빨간 점 + "LIVE" 애니메이션
- 알림 신청 버튼: 카카오 옐로우 컬러
- 교육 카드: 썸네일 + 카테고리 태그 + 진행률 바
- 플랫폼 아이콘: 각 플랫폼 로고 (네이버/유튜브/틱톡/인스타)

---

## 외부 API 연동

| 서비스 | 용도 | API |
|--------|------|-----|
| 카카오 | 로그인 + 알림톡 | Kakao OAuth + 비즈메시지 API |
| 구글 | 로그인 | Google OAuth |
| Supabase | DB + Auth + Storage | Supabase Client |
| Zoom | 실시간 교육 | Zoom Meeting SDK |
| YouTube | 라이브 임베드 | YouTube IFrame API |

---

## 참고 사이트
- [클래스유](https://www.classu.co.kr/new) - 교육 플랫폼 UI/UX 참고
- [네이버 쇼핑라이브](https://shoppinglive.naver.com/home) - 라이브쇼핑 UI/UX 참고
