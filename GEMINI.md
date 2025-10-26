# GEMINI.md

## Project Overview

AI 감정 분석 일기장을 위한 Gemini CLI 가이드

이 문서는 "AI 감정 분석 일기장" 프로젝트의 백엔드(Node.js/Express)에서 Google Cloud의 Gemini CLI (gcloud)를 사용하여 사용자의 일기 텍스트에 대한 감정 분석을 수행하는 방법을 안내합니다. 이 프로젝트는 AI와의 협업을 통해 개발되었습니다.

1. 개요

사용자가 프론트엔드(HTML/JS)에서 일기를 제출하면, 백엔드(Node.js)는 이 텍스트를 받아 gcloud 명령어를 실행하여 Gemini 모델에 분석을 요청합니다. Gemini는 텍스트의 감정("긍정", "부정", "중립")과 짧은 피드백을 JSON 형식으로 반환하며, 백엔드는 이를 파싱하여 다시 프론트엔드로 전달합니다.

2. 전제 조건

Node.js 서버에서 gcloud 명령어를 실행하기 위해 다음 환경이 서버에 설정되어 있어야 합니다.

- Google Cloud SDK 설치: gcloud CLI를 사용할 수 있어야 합니다.
- gcloud 인증: 서버 환경에서 Google Cloud 계정으로 인증되어 있어야 합니다. (예: gcloud auth application-default login 또는 서비스 계정 사용)
- Alpha 컴포넌트 설치: gcloud components install alpha 명령어로 alpha 컴포넌트가 설치되어 있어야 합니다.
- 프로젝트 및 API 활성화: API를 호출할 Google Cloud 프로젝트가 있어야 하며, 해당 프로젝트에서 Vertex AI API가 활성화되어 있어야 합니다.

3. 핵심 gcloud 명령어 및 프롬프트

백엔드는 사용자의 일기 내용을 받아, 이를 포함하는 프롬프트를 구성하여 gcloud 명령어를 실행합니다.

- **명령어 구조**
  ```bash
  gcloud alpha gen-ai language generate-content \
    --model=MODEL_NAME \
    --project=YOUR_PROJECT_ID \
    --location=YOUR_LOCATION \
    --contents="[PROMPT_TEXT]"
  ```
  - **MODEL_NAME:** `gemini-1.5-flash-preview-0514` (빠른 응답) 또는 `gemini-1.5-pro-preview-0514` (고성능)
  - **YOUR_PROJECT_ID:** 사용자의 Google Cloud 프로젝트 ID
  - **YOUR_LOCATION:** 리전 (예: `us-central1`, `asia-northeast3`)
  - **[PROMPT_TEXT]:** 아래 "프롬프트 템플릿"을 기반으로 구성된 실제 프롬프트 문자열

- **프롬프트 템플릿**

  Gemini가 원하는 JSON 형식으로 정확하게 응답하도록 지시하는 것이 중요합니다.

  ```
  "다음 텍스트의 감정을 '긍정', '부정', '중립' 중 하나로 분류하고, 감정에 기반한 짧은 공감 피드백(1-2 문장)을 제공해줘. 응답은 반드시 다음 JSON 형식이어야 해: {\"sentiment\": \"분석된 감정\", \"feedback\": \"AI 피드백\"}\n\n분석할 텍스트:\n\" [여기에 사용자 일기 내용 삽입] \""
  ```

  **중요:** 위 템플릿을 gcloud 명령어의 `--contents` 인자로 전달할 때는, JSON 형식의 따옴표(`"`)가 쉘에서 올바르게 이스케이프(escape) 처리되도록 `\"`로 변경해야 합니다.

4. 터미널 테스트 예시

Node.js 코드를 작성하기 전, 터미널에서 직접 명령어를 테스트해 볼 수 있습니다.

- **예시 일기:** "오늘 프로젝트 발표가 성공적으로 끝나서 정말 기쁘다. 팀원들과의 협력도 좋았다."

  ```bash
  # YOUR_PROJECT_ID와 YOUR_LOCATION을 실제 값으로 변경하세요.
  gcloud alpha gen-ai language generate-content \
    --model=gemini-1.5-flash-preview-0514 \
    --project=YOUR_PROJECT_ID \
    --location=us-central1 \
    --contents="다음 텍스트의 감정을 '긍정', '부정', '중립' 중 하나로 분류하고, 감정에 기반한 짧은 공감 피드백(1-2 문장)을 제공해줘. 응답은 반드시 다음 JSON 형식이어야 해: {\"sentiment\": \"분석된 감정\", \"feedback\": \"AI 피드백\"} 분석할 텍스트: \"오늘 프로젝트 발표가 성공적으로 끝나서 정말 기쁘다. 팀원들과의 협력도 좋았다.\""
  ```