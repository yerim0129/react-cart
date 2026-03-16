# CLAUDE.md — v4 (Auth 설계 반영)
> Claude Code가 이 프로젝트를 작업할 때 반드시 먼저 읽어야 하는 파일입니다.

## 프로젝트 개요
React + TypeScript 기반 쇼핑몰 프로젝트입니다.
이메일/비밀번호 로그인 + 유저별 장바구니 구조로 구성됩니다.
추후 관리자 페이지(Phase 3)로 고도화 예정입니다.

## ⚠️ 작업 방식 원칙 (반드시 숙지)
- 지시받은 Step에 해당하는 파일만 작업한다
- Phase 3 파일은 명시적 지시 전까지 생성하지 않는다
- docs/07_ROADMAP.md는 구조 파악용으로만 읽고, 선제 작업 금지

## 필수 참고 문서 (순서대로 읽을 것)
1. `docs/01_PROJECT_OVERVIEW.md` — 전체 구조 및 페이지 구성
2. `docs/02_TECH_STACK.md` — 기술 스택 및 버전, 설치 명령어
3. `docs/03_FOLDER_STRUCTURE.md` — 폴더/파일 구조 규칙 (Phase 표시 확인)
4. `docs/04_CODING_CONVENTIONS.md` — 코딩 컨벤션 및 패턴 규칙
5. `docs/05_API_DESIGN.md` — API 함수 설계 및 TanStack Query 패턴
6. `docs/06_DB_JSON.md` — JSON Server db.json 초기 데이터 구조
7. `docs/07_ROADMAP.md` — 고도화 계획 (읽기 전용, 선제 작업 금지)
8. `docs/08_DESIGN_GUIDE.md` — ⭐ 디자인 가이드 (CSS 변수, 컬러, 타이포)
9. `docs/09_AUTH_DESIGN.md` — ⭐ Auth 설계 (인증 흐름, 타입, 훅, 라우팅)

## 핵심 원칙 (절대 지켜야 함)

### 절대 하지 말 것
- `any` 타입 사용 금지
- 컴포넌트 내부에서 직접 `fetch` / `axios` 호출 금지 → 반드시 `api/` 레이어 통해서
- `useState`로 서버 데이터 관리 금지 → TanStack Query 사용
- `inline style` 사용 금지 → CSS Modules 사용
- Tailwind 유틸리티 클래스 사용 금지
- 하드코딩된 URL 문자열 금지 → `api/client.ts`의 baseURL 사용
- 현재 Step에서 지시하지 않은 파일 선제 생성 금지

### 반드시 할 것
- 모든 props에 TypeScript 타입 명시
- 스타일은 반드시 `컴포넌트명.module.css` 파일로 분리
- 공통 컴포넌트는 `components/common/`에 위치
- 커스텀 훅은 `use` 접두사 필수
- 에러/로딩 상태 항상 처리
- 함수형 컴포넌트만 사용
- 작업 완료 후 각 파일의 역할을 간략히 설명할 것

## 완료 현황

| Phase / Step | 내용 | 상태 |
|---|---|---|
| Phase 1 (Step 1~6) | 상품목록·상세·장바구니·결제·주문완료 | ✅ 완료 |
| Phase 2 | 찜하기·리뷰 | ✅ 완료 |
| Auth Step A | db.json(users/carts) + types/user.ts + validators 스키마 | ✅ 완료 |
| Auth Step B | api/auth.ts + store/authStore.ts + store/cartStore.ts(userId) | ✅ 완료 |
| Auth Step C | hooks/useAuth.ts + ProtectedRoute.tsx | ✅ 완료 |
| Auth Step D | LoginPage.tsx + RegisterPage.tsx | ✅ 완료 |
| Auth Step E | App.tsx 라우팅 + Header.tsx 로그인 상태 반영 | ✅ 완료 |
| Phase 3 | 관리자 페이지 (대시보드·상품CRUD·주문관리) | ⏳ 미진행 |

> Phase 3 (관리자)는 별도 지시 시 진행
