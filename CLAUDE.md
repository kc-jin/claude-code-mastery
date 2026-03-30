# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 프로젝트 개요

**개발자 웹 이력서 (Developer Portfolio/Resume Website)**

반응형 포트폴리오 웹사이트 개발 프로젝트입니다. HTML, CSS, JavaScript, Tailwind CSS를 사용하여 개발자의 기술 스택, 프로젝트, 경력 경험 등을 소개하는 웹사이트를 구축합니다.

---

## 언어 및 커뮤니케이션 규칙

### 기본 응답 언어
- **Claude의 응답**: 한국어로 진행
- **사용자와의 대화**: 한국어

### 코드 및 문서 작성 기준
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성 (README.md, ROADMAP.md 등)
- **변수명/함수명**: 영어로 작성 (코드 표준 준수)
  - 예: `const userName = 'John'` (O)
  - 예: `const 사용자이름 = 'John'` (X)

---

## 프로젝트 구조

```
claude-code-mastery/
├── CLAUDE.md              # 이 파일
├── ROADMAP.md             # 개발 로드맵 및 진행 상황 추적
├── index.html             # 메인 HTML 파일
├── css/
│   └── styles.css         # Tailwind CSS 커스텀 스타일
├── js/
│   └── script.js          # 인터랙션 및 동적 기능
└── assets/
    └── (이미지, 아이콘 등)
```

---

## 기술 스택

| 카테고리 | 기술 |
|---------|------|
| **마크업** | HTML5 (시맨틱) |
| **스타일링** | CSS3 + Tailwind CSS |
| **상호작용** | Vanilla JavaScript (외부 라이브러리 최소화) |
| **배포** | GitHub Pages / Netlify / Vercel |

---

## 개발 가이드라인

### 1. HTML 작성
- 시맨틱 HTML 태그 사용 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` 등)
- 접근성 고려 (`alt` 속성, ARIA 라벨 등)
- 반응형 설계 기반 (mobile-first)

### 2. CSS/Tailwind 작성
- **Tailwind CSS 유틸리티**: 가능한 한 Tailwind 클래스 우선 사용
- **커스텀 CSS**: 필요시 `css/styles.css`에 작성
- **반응형**: `sm:`, `md:`, `lg:`, `xl:` 프리픽스 활용
- **다크모드**: 나중 단계에서 추가 예정

### 3. JavaScript 작성
- Vanilla JavaScript만 사용 (프로젝트 초기 단계)
- 모듈식 함수로 작성
- 이벤트 위임 활용 (효율성)
- 주석은 한국어로 작성

### 4. 배포 고려사항
- SEO 최적화 (메타 태그, Open Graph 등)
- 이미지 최적화 필수
- 성능 최적화 (Lighthouse 점수 목표: 90+)

---

## 일반적인 개발 커맨드

### 프로젝트 시작
```bash
# 로컬 서버 실행 (Python이 있는 경우)
python -m http.server 8000

# 또는 Node.js http-server 사용
npx http-server
```

### 라이브 서버 (VS Code 확장)
- Live Server 확장 설치 후 `index.html` 우클릭 → "Open with Live Server"

---

## ROADMAP 추적

`ROADMAP.md` 파일의 체크박스를 사용하여 진행 상황을 추적합니다.
- Phase별로 구분되어 있으며, 각 단계마다 구체적인 작업 항목이 명시됨
- 완료된 항목: `[x]`로 표시
- 미완료 항목: `[ ]`로 표시

---

## 주요 개발 고려사항

### 반응형 디자인
- **모바일 (< 640px)**: 1칼럼 레이아웃
- **태블릿 (640px - 1024px)**: 2칼럼 레이아웃
- **데스크톱 (> 1024px)**: 3칼럼 이상 레이아웃

### 성능 최적화
- 이미지는 적절한 해상도로 최적화
- 불필요한 CSS/JS 최소화
- 캐싱 전략 고려

### 접근성 (Accessibility)
- WCAG 2.1 AA 표준 준수
- 키보드 네비게이션 지원
- 색상 대비도 충분히 유지

---

## 커밋 메시지 컨벤션

한국어로 작성, 다음 형식 따름:

```
[카테고리] 제목

- 추가 설명 (필요시)

예시:
[기능] Hero 섹션 HTML 마크업 추가
[스타일] About 섹션 Tailwind CSS 스타일링
[버그수정] 모바일 메뉴 토글 함수 수정
[문서] ROADMAP.md Phase 2 완료 표시
```

카테고리:
- `[기능]` - 새로운 기능 추가
- `[스타일]` - CSS/디자인 변경
- `[버그수정]` - 버그 수정
- `[리팩토링]` - 코드 개선 (기능 변화 없음)
- `[문서]` - 문서화 (README, ROADMAP 등)
- `[설정]` - 프로젝트 설정 변경

---

## 메모리 및 학습

진행 과정에서 다음을 기록합니다:
- 반복되는 개발 패턴
- Tailwind CSS 사용 팁
- 모바일 최적화 노하우
- 배포 시 발생한 이슈 및 해결 방법
