🤖 AI 감정 분석 일기장

사용자의 일기를 입력받아 Gemini CLI를 통해 감정을 분석하고 피드백을 제공하는 웹 애플리케이션입니다. (과제 제출용)

1. 프로젝트 개요

이 프로젝트는 사용자가 작성한 일기(텍스트)를 Node.js 백엔드로 전송하고, 백엔드는 Gemini CLI (gcloud)를 호출하여 해당 텍스트의 감정(긍정/부정/중립)을 분석합니다. 분석된 결과와 AI가 생성한 짧은 피드백을 다시 사용자에게 보여주는 간단한 일기장 서비스입니다.

2. 주요 기능

- 일기 작성: 사용자는 웹 인터페이스를 통해 '오늘의 일기'를 작성하고 저장할 수 있습니다.
- 감정 분석: '분석하기' 버튼을 누르면, 저장된 일기 내용이 백엔드로 전송되어 Gemini를 통해 감정 분석을 수행합니다.
- 결과 확인: 분석된 감정(예: 긍정)과 AI의 피드백(예: "좋은 하루를 보내셨네요!")이 화면에 표시됩니다.
- 일기 목록: 작성했던 일기들의 목록을 확인하고 삭제할 수 있습니다.

3. 사용된 기술 스택

- **Frontend:** HTML, CSS, JavaScript (Fetch API)
- **Backend:** Node.js, Express
- **Database:** SQLite3
- **AI/ML:** Google Cloud Gemini CLI (`gcloud alpha gen-ai language generate-content`)

4. 시스템 아키텍처 (간략)

Client (Browser) -> Express (Node.js) API -> SQLite (DB 저장) -> Gemini CLI (gcloud) -> Express -> Client

5. 설치 및 실행 방법

- **리포지토리 클론:**
  ```bash
  git clone https://github.com/Na0927s/ai-diary-project.git
  cd ai-diary-project
  ```
- **백엔드 설정 (Node.js):**
  ```bash
  # 의존성 설치
  npm install
  ```
- **Google Cloud SDK (gcloud) 설정:**
  - [Google Cloud SDK 설치](https://cloud.google.com/sdk/docs/install)
  - `gcloud auth application-default login` 또는 서비스 계정으로 인증
  - `gcloud components install alpha` (alpha 컴포넌트 설치)
  - `gcloud config set project [YOUR_PROJECT_ID]` (프로젝트 ID 설정)
- **백엔드 서버 실행:**
  ```bash
  node src/index.js
  ```
- **프론트엔드 실행:**
  - 브라우저에서 `public/index.html` 파일을 엽니다.

6. DB 스키마 (SQLite)

- **diaries 테이블**
  - `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT)
  - `content` (TEXT) - 일기 내용
  - `sentiment` (TEXT) - 분석된 감정 (예: "긍정", "부정", "중립")
  - `feedback` (TEXT) - AI 피드백
  - `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)

7. Gemini CLI 연동 및 AI 협업

본 프로젝트는 Vertex AI API의 Node.js SDK 대신 `gcloud` CLI를 직접 호출하는 방식을 사용합니다. AI와의 협업을 통해 초기 프로젝트 설정부터 기능 구현, 문서화까지 전 과정을 진행했습니다.

- **AI 협업 과정:** 자세한 개발 과정은 [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md) 파일을 참고하세요.
- **Gemini 프롬프트:** 감정 분석을 위해 아래와 같은 프롬프트를 사용합니다.
  ```
  "다음 일기 내용의 감정을 '긍정', '부정', '중립' 중 하나로 분석하고, 그에 어울리는 짧은 피드백을 한 문장으로 작성해주세요.\n\n일기 내용: {diary_content}\n\n분석 결과:"
  ```
- **AI 역할:** Gemini CLI는 코드 생성, 디버깅, 문서 작성 등 개발의 다양한 단계에서 보조적인 역할을 수행했습니다. 자세한 내용은 `GEMINI.md`와 커밋 로그를 참고하세요.