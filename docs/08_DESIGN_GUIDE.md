# 08. 디자인 가이드

## 디자인 철학
**Quiet Clarity** — 2026 팬톤 올해의 색상 Cloud Dancer(#F0EEE9)에서 출발한
조용하고 명료한 쇼핑 경험. 군더더기 없이 상품이 돋보이는 UI.

> "A conscious statement of simplification" — Pantone Color Institute

---

## 컬러 시스템

### Primary — Cloud Dancer 기반 뉴트럴
```css
/* 2026 Pantone Cloud Dancer #F0EEE9 를 베이스로 구성 */
--color-bg:           #F0EEE9;   /* Cloud Dancer — 페이지 전체 배경 */
--color-bg-surface:   #FAFAF8;   /* 카드/패널 배경 (Cloud Dancer보다 살짝 밝게) */
--color-bg-sunken:    #E8E5DF;   /* 인풋, 코드블록 등 들어간 영역 */
```

### Neutral — 텍스트 & 보더
```css
--color-text-primary:   #1A1917;   /* 제목, 본문 주요 텍스트 — 따뜻한 블랙 */
--color-text-secondary: #5C5955;   /* 부제목, 설명 텍스트 */
--color-text-tertiary:  #9C9890;   /* 비활성, placeholder */
--color-text-inverse:   #FAFAF8;   /* 다크 배경 위 텍스트 */

--color-border:         #D9D6CF;   /* 기본 보더 */
--color-border-strong:  #B8B5AE;   /* 강조 보더 */
```

### Accent — 포인트 컬러 (Atmospheric 팔레트 기반)
```css
/* Pantone Atmospheric 팔레트 — 청명한 블루·그린 계열 */
--color-accent:         #3D6B8E;   /* 메인 액션 컬러 (차분한 스틸 블루) */
--color-accent-hover:   #2E5470;   /* 호버 상태 */
--color-accent-light:   #EBF2F8;   /* 액센트 배경용 (뱃지, 하이라이트) */
--color-accent-text:    #FAFAF8;   /* 액센트 버튼 위 텍스트 */
```

### Semantic — 상태 컬러
```css
--color-success:        #3A7D5A;   /* 성공 — 따뜻한 그린 */
--color-success-light:  #EBF5EF;
--color-error:          #C0392B;   /* 에러 — 절제된 레드 */
--color-error-light:    #FAEAEA;
--color-warning:        #B8860B;   /* 경고 — 다크 골드 */
--color-warning-light:  #FDF6E3;
```

### Dark Mode 대비 (Phase 2 고려)
```css
[data-theme='dark'] {
  --color-bg:           #1A1917;
  --color-bg-surface:   #242220;
  --color-bg-sunken:    #2E2C2A;
  --color-text-primary: #F0EEE9;   /* Cloud Dancer → 다크모드에서 텍스트로 반전 */
  --color-text-secondary: #B8B5AE;
  --color-border:       #3A3835;
  --color-border-strong:#4E4B47;
}
```

---

## 타이포그래피

### 폰트
```css
/* index.css 상단에 Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap');

:root {
  --font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

> Pretendard — 한국어 UI에 최적화된 현대적 서체. 시스템 폰트 fallback 포함.

### 타입 스케일
```css
--font-size-xs:   11px;   /* 메타 정보, 라벨 */
--font-size-sm:   13px;   /* 보조 텍스트, 캡션 */
--font-size-base: 15px;   /* 본문 기본 */
--font-size-md:   17px;   /* 강조 본문 */
--font-size-lg:   20px;   /* 소제목 */
--font-size-xl:   24px;   /* 섹션 제목 */
--font-size-2xl:  32px;   /* 페이지 제목 */
--font-size-3xl:  40px;   /* 히어로 텍스트 */

--font-weight-regular: 400;
--font-weight-medium:  500;
--font-weight-semibold:600;
--font-weight-bold:    700;

--line-height-tight:  1.3;
--line-height-base:   1.6;
--line-height-loose:  1.8;
```

---

## 스페이싱 시스템 (8px 그리드)
```css
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
```

---

## 보더 & 쉐이프
```css
--radius-xs:   4px;    /* 인풋, 배지 */
--radius-sm:   6px;    /* 버튼 */
--radius-md:   10px;   /* 카드 */
--radius-lg:   16px;   /* 모달, 패널 */
--radius-full:  9999px; /* 필 버튼, 태그 */

--border-width: 1px;
--border-style: solid;
--border-color: var(--color-border);
```

---

## 그림자
```css
/* 색상 있는 배경(#F0EEE9)에서는 그림자 최소화 — 보더로 깊이 표현 */
--shadow-xs:  0 1px 2px rgba(26, 25, 23, 0.06);
--shadow-sm:  0 2px 8px  rgba(26, 25, 23, 0.08);
--shadow-md:  0 4px 16px rgba(26, 25, 23, 0.10);
--shadow-lg:  0 8px 32px rgba(26, 25, 23, 0.12);
```

---

## 트랜지션
```css
--transition-fast:   150ms ease;
--transition-base:   200ms ease;
--transition-slow:   300ms ease;
```

---

## 레이아웃 & 그리드
```css
--max-width-content: 1200px;   /* 전체 페이지 최대 너비 */
--max-width-narrow:   720px;   /* 결제, 폼 페이지 */

/* 상품 그리드 */
/* 데스크탑: 4열 / 태블릿: 2열 / 모바일: 1열 (또는 2열) */
```

---

## 컴포넌트 디자인 토큰

### Button
```css
/* Primary */
.button-primary {
  background: var(--color-accent);
  color: var(--color-accent-text);
  border-radius: var(--radius-sm);
  padding: var(--space-3) var(--space-6);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  transition: background var(--transition-fast);
}
.button-primary:hover { background: var(--color-accent-hover); }

/* Secondary */
.button-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: var(--border-width) var(--border-style) var(--color-border-strong);
  border-radius: var(--radius-sm);
}

/* Ghost */
.button-ghost {
  background: transparent;
  color: var(--color-accent);
  border: none;
}
```

### Card (상품 카드)
```css
.card {
  background: var(--color-bg-surface);
  border: var(--border-width) var(--border-style) var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Input
```css
.input {
  background: var(--color-bg-sunken);
  border: var(--border-width) var(--border-style) var(--color-border);
  border-radius: var(--radius-xs);
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast);
}
.input:focus {
  border-color: var(--color-accent);
  outline: none;
}
```

### Badge
```css
.badge {
  background: var(--color-accent-light);
  color: var(--color-accent);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}
```

---

## index.css 최종 구조

```css
/* 1. Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap');

/* 2. CSS 변수 */
:root {
  /* 위의 모든 변수 선언 */
}

/* 3. 다크모드 변수 (Phase 2 대비) */
[data-theme='dark'] { ... }

/* 4. Reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* 5. Base */
body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background-color: var(--color-bg);
  line-height: var(--line-height-base);
  -webkit-font-smoothing: antialiased;
}

img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; font-family: inherit; }
```

---

## UI 레퍼런스 무드

- **키워드**: Quiet Luxury, Clean Commerce, Warm Minimal
- **참고 서비스**: Muji 온라인몰, Aesop, Net-a-Porter
- **배경**: Cloud Dancer(#F0EEE9) — 차갑지 않은 따뜻한 화이트
- **포인트**: 스틸 블루(#3D6B8E) — 신뢰감 있는 액션 컬러
- **텍스트**: 따뜻한 블랙(#1A1917) — 순수 블랙보다 눈에 편안

---

## Claude Code 작업 지시 (index.css)

```
docs/08_DESIGN_GUIDE.md를 읽고
src/index.css를 아래 순서로 작성해줘.

1. Google Fonts Pretendard import
2. :root CSS 변수 전체 (컬러, 타이포, 스페이싱, 보더, 그림자, 트랜지션)
3. [data-theme='dark'] 변수 (Phase 2 대비, 주석 처리)
4. Reset CSS
5. Body 기본 스타일

기존 Vite 기본 index.css 내용은 전부 교체할 것.
```
