## PHASE 0: GitHub 및 로컬 환경 설정

*   GitHub 저장소 생성 (ai-diary-project)
*   로컬 프로젝트 폴더 생성 및 git init
*   `main` 및 `develop` 브랜치 생성 및 `develop` 브랜치로 전환

## PHASE 1: 프로젝트 초기 구조 설정

*   `src`, `public` 폴더 생성
*   `README.md`, `GEMINI.md`, `DEVELOPMENT_LOG.md`, `.gitignore` 파일 생성
*   `.gitignore` 파일에 `node_modules/`, `*.db`, `*.db-journal`, `.DS_Store` 추가
*   첫 커밋 및 `develop`, `main` 브랜치 push

## PHASE 2: 백엔드 기본 설정 (DB, Express)

*   `feat/backend-setup` 브랜치 생성
*   `npm init -y` 및 `express`, `cors`, `sqlite3` 설치
*   `src/database.js`: SQLite DB 연결 및 `diaries` 테이블 생성 로직 구현
*   `src/index.js`: Express 서버 기본 설정
*   기능 브랜치 commit, push 및 `develop` 브랜치로 merge

## PHASE 3: 일기장 핵심 기능 (CRUD API) 구현

*   `feat/diary-crud-api` 브랜치 생성
*   `src/index.js`에 API 라우트 추가
    *   `POST /diaries`: 일기 생성 API
    *   `GET /diaries`: 일기 목록 조회 API
    *   `DELETE /diaries/:id`: 일기 삭제 API
*   기능별 commit 및 `develop` 브랜치로 merge

## PHASE 4: 프론트엔드 UI 및 연동

*   `feat/frontend-ui` 브랜치 생성
*   `public/index.html`: 일기장 기본 HTML 구조 작성
*   `public/style.css`: 반응형 CSS 레이아웃 적용
*   `feat/frontend-logic` 브랜치 생성
*   `public/app.js`: CRUD API 연동 (일기 목록 조회, 생성, 삭제)
*   기능별 commit 및 `develop` 브랜치로 merge

## PHASE 5: Gemini CLI 감정 분석 연동

*   `feat/gemini-analysis` 브랜치 생성
*   `src/geminiService.js`: `gcloud` 명령어를 실행하여 Gemini API 호출하는 함수 구현
*   `src/index.js`: `POST /analyze/:id` API 구현. DB에서 일기 내용을 가져와 `geminiService`로 전달하고, 결과를 DB에 업데이트
*   `public/app.js`: '분석' 버튼 클릭 시 `/analyze/:id` API를 호출하고, 결과를 화면에 표시하는 기능 구현
*   기능별 commit 및 `develop` 브랜치로 merge
