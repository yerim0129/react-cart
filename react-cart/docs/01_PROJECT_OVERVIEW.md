# 01. 프로젝트 개요

## 프로젝트명
**ShopTS** — React + TypeScript 쇼핑몰

## 목적
퍼블리셔 → 프론트엔드 개발자 전환을 위한 포트폴리오 프로젝트.
실무에서 자주 쓰이는 패턴을 최대한 녹여낸다.

---

## 페이지 구성

| 경로 | 페이지명 | 주요 기능 |
|---|---|---|
| `/` | 홈 (상품 목록) | 상품 목록, 검색, 카테고리 필터, 정렬 |
| `/products/:id` | 상품 상세 | 상품 정보, 옵션 선택, 장바구니 담기 |
| `/cart` | 장바구니 | 수량 조절, 삭제, 금액 합계 |
| `/checkout` | 결제 | 배송지 입력 폼, 주문 요약, 주문 완료 |
| `/order-complete` | 주문 완료 | 주문 완료 메시지, 주문 번호 |

---

## 핵심 기능 목록

### 상품 목록 페이지
- 전체 상품 목록 조회 (TanStack Query)
- 카테고리별 필터링 (URL 쿼리 파라미터 기반)
- 상품명 검색 (debounce 적용)
- 가격순/최신순 정렬
- 로딩 스켈레톤 UI

### 상품 상세 페이지
- 상품 단건 조회
- 장바구니 담기 (Zustand)
- 수량 선택

### 장바구니 페이지
- 담긴 상품 목록 (Zustand에서 읽기)
- 수량 증감
- 개별/전체 삭제
- 총 금액 계산 (파생 상태)

### 결제 페이지
- 배송지 입력 폼 (React Hook Form)
- 실시간 유효성 검사 (zod)
- 주문 API 호출 (POST /orders)
- 결제 완료 후 장바구니 초기화

---

## 데이터 흐름 요약

```
JSON Server (db.json)
    ↓ HTTP (axios)
api/ 레이어
    ↓ TanStack Query (useQuery / useMutation)
커스텀 훅 (hooks/)
    ↓
컴포넌트 (pages/ + components/features/)
    ↑
Zustand store (장바구니 상태)
```
