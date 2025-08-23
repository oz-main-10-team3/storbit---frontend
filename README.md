## 📌 프로젝트 개요
사용자가 직접 스터디를 개설하고 실시간으로 소통할 수 있는 웹 서비스로, 효율적인 학습 환경을 제공하는 플랫폼입니다.

<br/>

## 🔗 배포 링크

- [Storbit 웹사이트 배포주소](https://storbit.p-e.kr)

<br/>

## 📅 프로젝트 기간
2025.07.18(금) ~ 2025.08.22(금)  
- 총 일수: 36일  
- 워킹데이: 25일 (주말/공휴일 제외)

<br/>

## 🙌 팀원 
<table>
  <thead>
    <tr>
      <th>이름</th>
      <th>역할</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/yongarframe">최용훈</a><br/> 
        <img src="https://github.com/yongarframe.png" width="80" alt="최용훈"/>       
      </td>
      <td> 로그인/회원가입<br/> 마이페이지<br/> 스터디룸</td>      
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/Lee-sung-il">이성일</a><br/> 
        <img src="https://github.com/Lee-sung-il.png" width="80" alt="이성일"/>       
      </td>
      <td>나의 스터디<br/>이벤트 페이지<br/>이벤트 admin</td>      
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/93choi">최진희</a><br/> 
        <img src="https://github.com/93choi.png" width="80" alt="최진희"/>       
      </td>
      <td>피그마 디자인<br/>메인페이지<br/>카테고리페이지</td>      
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/Js00223">허준서</a><br/> 
        <img src="https://github.com/Js00223.png" width="80" alt="허준서"/>       
      </td>
      <td>스터디 만들기 페이지<br/>스터디 상세페이지</td>      
    </tr>
  </tbody>
</table>


<br/>

## 🖥 기술 스택

### 🚀 프론트엔드

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)


### 🎨 스타일링

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![clsx](https://img.shields.io/badge/clsx-DB7093?style=for-the-badge)
![tailwind-merge](https://img.shields.io/badge/tailwind--merge-38B2AC?style=for-the-badge)
![cva](https://img.shields.io/badge/cva-20232A?style=for-the-badge)



### 📦 라이브러리
![reacthookform](https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![joi](https://img.shields.io/badge/joi-20232A?style=for-the-badge)
![zustand](https://img.shields.io/badge/zustand-purple?style=for-the-badge&logo=zustand&logoColor=white)
![Konva](https://img.shields.io/badge/Konva-4285F4?style=for-the-badge)
![axios](https://img.shields.io/badge/axios-671DDF?style=for-the-badge&logo=axios&logoColor=white)
![react-calendar](https://img.shields.io/badge/react--calendar-61DAFB?style=for-the-badge)



### ☁️ 배포 환경

![Amazon S3](https://img.shields.io/badge/Amazon%20S3-FF9900?style=for-the-badge&logo=Amazon-S3&logoColor=white)
![Amazon CloudFront](https://img.shields.io/badge/Amazon%20CloudFront-464A5F?style=for-the-badge&logo=Amazon-CloudFront&logoColor=white)
![git](https://img.shields.io/badge/git-F05033?style=for-the-badge&logo=git&logoColor=white)
![github](https://img.shields.io/badge/github-100000?style=for-the-badge&logo=github&logoColor=white)



<br/>

## ✅ 구현 기능

### 🧩 공통 컴포넌트

- `Input`, `Button`, `CloseButton`, `Modal` 등 **UI 구성 요소를 재사용 가능한 컴포넌트로 분리**
- 유지보수성과 일관성을 고려한 컴포넌트 구조 설계



### 🔐 로그인 기능

- 이메일 / 비밀번호 입력 및 로그인 요청 처리
- **ID/PW 찾기 모달 UI** 구현
- **로컬스토리지 기반 로그인 상태 유지**



### 📝 회원가입 기능

- react-hook-form 과 joi 라이브러리로 유효성 검증 및 제출 구현
- 이름, 닉네임, 이메일, 비밀번호, 휴대전화번호 ,성별 필수 입력
- 닉네임 : 서버에서 중복 확인 및 실패 응답
- 이메일 인증: 인증요청 시  인증번호 발송 및 인증번호 입력란 생성되며 5분이내 입력 **타이머 기능 포함**
- 모든 항목 유효성 통과 시 `가입하기` 버튼 활성화



### 🗂 메인 페이지

- 카테고리별 스터디 탐색 및 검색


### ✍️ 스터디 생성
- 로그인 후 스터디 생성페이지 이동이 가능
- 필수 항목 입력 후 스터디를 생성하면 메인의 new study 항목에 나타남
- 스터디를 생성한 유저가 방장으로 지정 됨.

### 마이 페이지
- 계정 정보, 쪽지함, 개인 스터디 정보 확인


### 마이 스터디
- 찜한 스터디, 내가만든 스터디, 참여한 스터디, 신청한 스터디를 볼수 있습니다.

### 스터디룸
- Drawing tool 펜/원 두가지 구현 (색상변경 가능)
- 웹소켓을 활용해 실시간 공유 가능



## 폴더 구조
```
src
├─ │
│  ├─ components                                    컴포넌트
│  │  ├─ Category                                   카테고리 페이지 컴포넌트
│  │  ├─ Layout                                     레이아웃 관련 컴포넌트
│  │  ├─ Main                                       메인 페이지 컴포넌트
│  │  ├─ auth                                       로그인/로그아웃/회원가입 관련 컴포넌트
│  │  ├─ event                                      이벤트 페이지 컴포넌트
│  │  ├─ mypage                                     마이페이지 컴포넌트
│  │  │  ├─ messageInboxPage                        마이페이지 > 쪽지함 페이지 컴포넌트
│  │  │  ├─ messageSentboxPage                      마이페이지 > 보낸쪽지함 페이지 컴포넌트
│  │  │  └─ studyPlannerPage                        마이페이지 > 스터디플래너 페이지 컴포넌트
│  │  ├─ search                                     검색페이지 컴포넌트
│  │  └─ study                                      스터디 관련 폴더
│  │     └─ studyRoomPage                           스터디룸 페이지 컴포넌트
│  ├─ constants                                     상수값 정의
│  ├─ data                                          mockdata 저장
│  ├─ hooks                                         커스텀 hooks
│  ├─ index.css
│  ├─ main.tsx
│  ├─ mystudymockdata                               스터디관련 mockdata 저장
│  ├─ pages                                         페이지 폴더
│  │  ├─ Layout                                     레이아웃 페이지
│  │  ├─ NotFound.tsx                               404 페이지
│  │  ├─ auth                                       로그인/로그아웃/회원가입 페이지
│  │  ├─ category                                   카테고리 페이지
│  │  ├─ contact                                    문의하기 페이지 (현재 미구현)
│  │  ├─ event                                      이벤트 페이지
│  │  ├─ mypage                                     마이페이지
│  │  ├─ mystudy                                    마이스터디 페이지
│  │  ├─ privacy                                    개인정보처리방침 페이지
│  │  ├─ search                                     검색 페이지
│  │  ├─ study                                      스터디 관련 페이지 (스터디 만들기, 스터디 상세, 스터디룸)
│  │  └─ terms                                      약관 페이지
│  ├─ schemas                                       joi 라이브러리 유효성 스키마 정의
│  ├─ store                                         zustand 전역 관리 폴더
│  ├─ types                                         타입관련 폴더
│  ├─ utils                                         유틸함수 폴더

```
