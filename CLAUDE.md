# CLAUDE.md — v3 (Step by Step 방식 반영)
> Claude Code가 이 프로젝트를 작업할 때 반드시 먼저 읽어야 하는 파일입니다.

## 프로젝트 개요
React + TypeScript 기반 쇼핑몰 프로젝트입니다.
상품 목록 / 상품 상세 / 장바구니 / 결제 페이지로 구성되며,
추후 관리자 페이지 / 찜하기 / 리뷰 기능으로 고도화 예정입니다.

## ⚠️ 작업 방식 원칙 (반드시 숙지)

**지시받은 Step에 해당하는 파일만 작업한다.**
고도화(Phase 2, 3) 파일은 해당 Step이 명시적으로 지시될 때까지 절대 생성하지 않는다.
docs/07_ROADMAP.md는 구조 파악용으로만 읽고, 선제적으로 파일을 만들지 않는다.

## 필수 참고 문서 (순서대로 읽을 것)
1. `docs/01_PROJECT_OVERVIEW.md` — 전체 구조 및 페이지 구성
2. `docs/02_TECH_STACK.md` — 기술 스택 및 버전, 설치 명령어
3. `docs/03_FOLDER_STRUCTURE.md` — 폴더/파일 구조 규칙 (Phase 표시 확인)
4. `docs/04_CODING_CONVENTIONS.md` — 코딩 컨벤션 및 패턴 규칙
5. `docs/05_API_DESIGN.md` — API 함수 설계 및 TanStack Query 패턴
6. `docs/06_DB_JSON.md` — JSON Server db.json 초기 데이터 구조
7. `docs/07_ROADMAP.md` — 고도화 계획 (읽기 전용 참고, 선제 작업 금지)

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

## Phase 1 작업 순서 (Step 지시가 있을 때만 진행)

- **Step 1** — 세팅 + 타입 + 유틸 + API 레이어 + Store
- **Step 2** — 공통 컴포넌트 (Button, Input, Spinner 등)
- **Step 3** — 상품 목록 페이지 (홈)
- **Step 4** — 상품 상세 페이지
- **Step 5** — 장바구니 페이지
- **Step 6** — 결제 + 주문완료 페이지

> Phase 2 (찜하기, 리뷰), Phase 3 (관리자)는 별도 지시 시 진행
