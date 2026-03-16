# 02. 기술 스택

## 버전 명세

| 패키지 | 버전 | 용도 |
|---|---|---|
| react | ^18.3.1 | UI 라이브러리 |
| typescript | ^5.5.3 | 타입 시스템 |
| vite | ^5.4.1 | 번들러 / 개발 서버 |
| react-router-dom | ^6.26.1 | 클라이언트 라우팅 |
| @tanstack/react-query | ^5.56.2 | 서버 상태 관리 |
| zustand | ^4.5.5 | 클라이언트 상태 관리 |
| axios | ^1.7.7 | HTTP 클라이언트 |
| react-hook-form | ^7.53.0 | 폼 상태 관리 |
| zod | ^3.23.8 | 스키마 유효성 검사 |
| @hookform/resolvers | ^3.9.0 | RHF + zod 연결 |
| clsx | ^2.1.1 | 조건부 클래스 조합 (CSS Modules와 함께 사용) |
| json-server | ^0.17.4 | 로컬 Mock API 서버 |

> ✅ 스타일링: CSS Modules — Tailwind 미사용, Vite 기본 제공이므로 추가 설치 불필요

---

## 프로젝트 초기 세팅 명령어

```bash
# 1. Vite로 프로젝트 생성
npm create vite@latest shop-ts -- --template react-ts
cd shop-ts

# 2. 의존성 설치
npm install react-router-dom @tanstack/react-query axios zustand
npm install react-hook-form zod @hookform/resolvers clsx

# 3. JSON Server 설치 (devDependency)
npm install -D json-server concurrently

# 4. 타입 패키지
npm install -D @types/node
```

---

## package.json scripts 설정

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "server": "json-server --watch db.json --port 3001",
    "dev:all": "concurrently \"npm run dev\" \"npm run server\""
  }
}
```

---

## CSS Modules 사용 방법 (Vite 기본 지원)

추가 설치 없음. 파일명을 `.module.css`로 만들면 자동 활성화됩니다.

```tsx
// Button.module.css 파일이 있다면
import styles from './Button.module.css'

<button className={styles.button}>클릭</button>
```

### clsx와 함께 조건부 클래스 처리

```tsx
import clsx from 'clsx'
import styles from './Button.module.css'

// 올바른 패턴
<button
  className={clsx(
    styles.button,
    isActive && styles.active,
    disabled && styles.disabled
  )}
>
  버튼
</button>
```

---

## tsconfig.json 핵심 설정

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## vite.config.ts 설정

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```
