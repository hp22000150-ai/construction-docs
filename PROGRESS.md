# 공사일지 프로젝트 진행 현황

## 작업 목표
작업일보 입력/미리보기/인쇄 Electron 앱 제작 (공사사진대지와 동일 구조)
원본: C:\Users\USER\Downloads\작업일보.html

## 완료한 것
- Electron 프로젝트 생성 (main.js, preload.js, start.js, package.json, index.html)
- npm install 완료 (node_modules 존재)
- 좌측 입력 패널 + 우측 미리보기/인쇄 레이아웃
- 공사명 / 직종 / 성명 / 현장대리인 localStorage 관리 (저장·삭제·선택)
- 날씨 자동 입력 (Open-Meteo API, 위치 기반)
- 인력 행 성명 필드: input + datalist 자동완성 (직접 타이핑 가능)
- 인력 공수: select (0.5 / 1.0)
- 장비 금일: select (0.5 / 1.0), 선택 시 누계 자동 반영
- **누계 누적 저장**: 일보 생성하기 클릭 시 daily_logs(localStorage)에 날짜별 저장
  - 인력: 이름 기준으로 누적 공수 계산
  - 장비: 장비명 기준으로 누적 금일 계산
  - 같은 날 재생성 시 덮어씀 (중복 없음)
- 인력 문서에 누계 컬럼 추가 (colspan 4→5)
- 저장 함수 alert 제거 → 포커스 유지로 연속 입력 가능
- A4 인쇄 레이아웃, 결재란 포함

## 다음 할 일 (미완료)
- 사용자가 "아직 더 해야 하는 것이 있다"고 했으나 내용 미확인
  → 다음 세션 시작 시 무엇을 추가할지 먼저 물어볼 것
- 고려 가능한 추가 기능:
  - 누계 초기화 / 공사별 누계 분리
  - 자재 반입 자동완성
  - 자동저장 (localStorage)
  - 설치파일 빌드 (npm run build)

## 실행 방법
```
cd C:\Users\USER\AI-Founders\공사일지
npm start
```
