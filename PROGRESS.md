# 공사일지 프로젝트 진행 현황

## 버전
V 0.601.0 (GitHub 기준)

## 파일 구성
- `index.html` — PC 일보 작성 + 미리보기 + 인쇄 + 계산기 모달
- `mobile.html` — 현장 모바일 입력 + 사진 첨부 + 계산기 모달
- `report.html` — 정산 보고서 (인력·장비 공수 합계 + 단가 계산)
- `고사목조사.html` — 수목 하자목 조사 전용 (PDF 인쇄·규격칩·수종 70여 종)
- `하자관리.html` — 하자 접수·진행·완료 관리
- `survey.html` — 범용 현장 조사 (품목·상태 자유 설정)
- `통합-PC.html` — 사무실 통합 출력 앱
- `Capacitor_Android_설치가이드.html` — Android APK 배포 가이드
- `main.js`, `preload.js`, `start.js` — Electron 앱 파일
- `manifest.json` — 모바일 PWA 설정

## 완료된 기능

### index.html (PC)
- 좌측 입력 패널 + 우측 미리보기/인쇄 레이아웃
- ⚙️ 기본설정 모달: 공사명·시공사·직종·성명·장비명·현장대리인 목록 관리
- 공사명·시공사 드롭다운 선택
- 날씨 자동 입력 (Open-Meteo API, GPS 위치 기반)
- 장비 행: 장비명·기사명·시간(0.5/1.0)·누계·비고·금액(원)
- 인력 총 공수 실시간 합계 배지
- ⏮ 전날 인력·장비 복사 버튼
- 누계 누적 저장 (월별 번들: `"공사명||YYYY-MM": { "DD": data }`)
- 📤 내보내기 / 📥 불러오기 / 💾 전체 백업 / 📂 전체 복원
- 🔒 잠금 / 🔄 재작성
- 작업내용 템플릿 저장/불러오기
- 미리보기 A4 레이아웃 (인력 좌 / 장비 우상 / 자재 우하)
- 🔧 계산기 모달 고정 크기 (580×640px)
- 📖 도움말
- Electron 전용: 폴더 선택 후 파일 저장 (OneDrive/구글드라이브 연동)

### mobile.html (현장 모바일)
- 카드형 입력 UI (터치 친화적)
- ⚙️ 기본설정 바텀시트 → PC(640px↑)에서 중앙 팝업 자동 전환
- 인력/장비/자재 카드 추가/삭제
- 날씨 GPS 자동입력 / 인력 총 공수 배지 / 전날 복사
- 📷 현장 사진 첨부 (최대 6장, 자동 압축)
- 💾 임시저장 / 📂 불러오기 (저장 여부 버튼 색 변경)
- 📤 내보내기: 잠금 + Web Share API
- 🖨️ PDF 인쇄 (사진 포함)
- 🔧 계산기 모달: 모바일=80vh 바텀시트, PC=560×640px 중앙 팝업

### report.html (정산)
- 기간 + 공사명 필터
- 인력 정산: 성명별 공수 합계 + 단가 입력 + 금액 계산
- 장비 정산: 장비명별 일수 합계 + 단가 입력 (규격 컬럼 제거됨)
- 단가 localStorage 저장 / 소계·합계 / PDF 인쇄

### 고사목조사.html (수목 하자목 조사)
- 현장별 수목 조사 등록·수정·삭제
- 수종 70여 종 기본 탑재 (교목·관목·침엽·지피)
- 규격 빠른 입력 칩 (R10·B15·H3×W2 등)
- 상태: 완전고사 / 쇠약 / 의심
- 조사자 자동완성 / 사진 최대 6장
- 수종별·구역별 집계 탭
- 🖨️ PDF 인쇄: 조사보고서 형식 (수목목록 + 사진 포함)
- 📖 도움말 / V 0.601.0
- localStorage: `survey_records`, `survey_settings`

### 하자관리.html (하자 관리)
- 하자 접수·검토중·조치중·조치완료·확인완료 상태 관리
- 하자유형 조경 특화 목록
- 현장명·상태 필터 / 사진 첨부
- localStorage: `defect_records`, `defect_settings`

### survey.html (범용 현장 조사)
- 고사목조사.html 기반, 품목·상태를 자유롭게 설정
- 설정에서 품목목록·상태·조사자 관리
- 조사별 단위 설정 (개/그루/m²/m/식 등)
- PDF 인쇄 / 도움말
- localStorage: `gen_survey_records`, `gen_survey_settings`

### 계산기 모달 (index.html + mobile.html 공통)
- 🌳 수목 중량 계산기 (크레인 용량 산정용)
- 📐 면적 계산기 (m²↔평↔ha)
- 🌱 근분 규격 참고표

## 이번 세션 주요 수정 버그
- `calcManCumul`/`calcEqCumul`: 프로젝트 접두사 키 날짜 비교 버그 → 누계 0 문제 수정
- index.html 장비 `amount` 필드 저장 누락 수정
- report.html 삭제된 `spec`(규격) 컬럼 참조 제거
- 계산기·기본설정 모달: PC에서 열면 중앙 팝업으로 표시

## 주요 데이터 구조
```
localStorage:
  projects        — 공사명 목록 []
  companies       — 시공사 목록 []
  jobs            — 직종 목록 ["직영","용역","특수인부"]
  names           — 성명 목록 []
  equip_names     — 장비명 목록 ["굴삭기","지게차","카고크레인","화물트럭"]
  supervisors     — 현장대리인 목록 []
  daily_logs      — { "공사명||YYYY-MM": { "DD": { man, eq, mt, ... } } }
  unit_prices     — { man: {성명:단가}, eq: {장비명:단가} }
  work_templates  — [{ name, work, plan }]

장비 데이터: { name, driver, today, note, amount }

survey_records / survey_settings     — 고사목조사.html
gen_survey_records / gen_survey_settings — survey.html (범용)
defect_records / defect_settings     — 하자관리.html
```

## 실행 방법
```
cd C:\Users\USER\AI-Founders\construction-docs
npm start            ← Electron 앱
index.html           ← PC 일보 (브라우저 직접 열기)
mobile.html          ← 모바일 현장 입력
report.html          ← 정산
고사목조사.html       ← 수목 하자목 조사
하자관리.html         ← 하자 관리
survey.html          ← 범용 현장 조사
통합-PC.html          ← 통합 출력 (사무실용)
```

## GitHub
- Remote: https://github.com/hp22000150-ai/construction-docs.git
- 작업 흐름: PC에서 push → 여기서 git reset --hard origin/master
