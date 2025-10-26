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
