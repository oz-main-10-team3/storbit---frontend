```
storbit
├─ .husky                                           허스키 설정 폴더
│  ├─ commit-msg                                    커밋 컨벤션 규칙
│  └─ pre-commit                                    커밋전 lint 및 prettier 검사
├─ .prettierrc                                      prettier 규칙
├─ README.md
├─ eslint.config.js                                 lint 설정
├─ index.html
├─ package-lock.json
├─ package.json
├─ src
│  ├─ App.css                                       tailwindcss 스타일링 전역 변수 설정
│  ├─ App.tsx
│  ├─ admin                                         admin 관련 컴포넌트 (이벤트 페이지 생성/업데이트)
│  ├─ api                                           axios 인스턴스 , msw, 웹소켓 통신
│  │  ├─ mainApi.ts                                 서버 / msw api 연결
│  │  ├─ mswMock                                    msw 모킹용 api 폴더
│  │  │  ├─ MockData.ts                             msw Mock 데이터 저장
│  │  │  ├─ browser.ts                              msw handler 함수를 모아서 전달
│  │  │  └─ handlers                                msw handler 함수 폴더
│  │  │     ├─ authHandlers.ts                      msw 로그인/로그아웃/회원가입
│  │  │     ├─ myStudiesHandlers.ts                 msw 나의 스터디
│  │  │     └─ studyMakeHandlers.ts                 msw 스터디 만들기
│  │  ├─ myApplications.ts
│  │  └─ socket.ts
│  ├─ assets
│  ├─ common
│  ├─ components
│  │  ├─ Category
│  │  ├─ Layout
│  │  ├─ Main
│  │  ├─ auth
│  │  ├─ event
│  │  ├─ mypage
│  │  │  ├─ messageInboxPage
│  │  │  ├─ messageSentboxPage
│  │  │  └─ studyPlannerPage
│  │  ├─ search
│  │  └─ study
│  │     └─ studyRoomPage
│  ├─ constants
│  ├─ data
│  ├─ hooks
│  ├─ index.css
│  ├─ main.tsx
│  ├─ mystudymockdata
│  ├─ pages
│  │  ├─ Layout
│  │  ├─ NotFound.tsx
│  │  ├─ auth
│  │  ├─ category
│  │  ├─ contact
│  │  ├─ event
│  │  ├─ mypage
│  │  ├─ mystudy
│  │  ├─ privacy
│  │  ├─ search
│  │  ├─ study
│  │  └─ terms
│  ├─ schemas
│  ├─ store
│  ├─ types
│  ├─ utils
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

```
storbit
├─ .husky
│  ├─ _
│  │  ├─ applypatch-msg
│  │  ├─ commit-msg
│  │  ├─ h
│  │  ├─ husky.sh
│  │  ├─ post-applypatch
│  │  ├─ post-checkout
│  │  ├─ post-commit
│  │  ├─ post-merge
│  │  ├─ post-rewrite
│  │  ├─ pre-applypatch
│  │  ├─ pre-auto-gc
│  │  ├─ pre-commit
│  │  ├─ pre-merge-commit
│  │  ├─ pre-push
│  │  ├─ pre-rebase
│  │  └─ prepare-commit-msg
│  ├─ commit-msg
│  └─ pre-commit
├─ .prettierrc
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  ├─ event
│  │  │  ├─ detail1.png
│  │  │  ├─ detail2.png
│  │  │  └─ thumb.png
│  │  ├─ font
│  │  │  └─ PretendardVariable.woff2
│  │  ├─ icons
│  │  │  ├─ CheckIcon.png
│  │  │  ├─ MainLogo.png
│  │  │  └─ StudyStartIcon.png
│  │  └─ mockdataimage
│  │     ├─ profile.png
│  │     └─ requestedStudy.png
│  ├─ mockServiceWorker.js
│  └─ vite.svg
├─ qodana.yaml
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ admin
│  │  └─ events
│  │     ├─ CreateEvent.tsx
│  │     └─ UpdateEvent.tsx
│  ├─ api
│  │  ├─ mainApi.ts
│  │  ├─ mswMock
│  │  │  ├─ MockData.ts
│  │  │  ├─ browser.ts
│  │  │  └─ handlers
│  │  │     ├─ authHandlers.ts
│  │  │     ├─ myStudiesHandlers.ts
│  │  │     └─ studyMakeHandlers.ts
│  │  └─ myApplications.ts
│  ├─ assets
│  │  ├─ font
│  │  │  └─ PretendardVariable.woff2
│  │  ├─ icons
│  │  │  ├─ CheckIcon.png
│  │  │  ├─ MainLogo.png
│  │  │  └─ StudyStartIcon.png
│  │  └─ images
│  │     ├─ achievement-banner.png
│  │     ├─ admin-logo.png
│  │     ├─ beginner-banner.png
│  │     ├─ best-banner.png
│  │     ├─ custom-banner.png
│  │     ├─ dawn-banner.png
│  │     ├─ deadline-banner.png
│  │     ├─ default-profile.png
│  │     ├─ default-thumbnail.png
│  │     ├─ favicon-32x32.png
│  │     ├─ hot-banner.png
│  │     ├─ logo-w.png
│  │     ├─ main01.png
│  │     └─ weekend-banner.png
│  ├─ common
│  │  ├─ ArrowNavigation.tsx
│  │  ├─ CommonButton.tsx
│  │  ├─ CommonModal.tsx
│  │  ├─ ConfirmModal
│  │  │  └─ ApplicationCompleted.tsx
│  │  ├─ ConfirmModal.tsx
│  │  ├─ DropDown.tsx
│  │  ├─ InputField.tsx
│  │  ├─ LeaderDelegateModal.tsx
│  │  ├─ LeaderMissionModal.tsx
│  │  ├─ MemberKickModal.tsx
│  │  ├─ MemberStatusModal.tsx
│  │  ├─ MissionModal.tsx
│  │  ├─ ModalWrapper.tsx
│  │  ├─ RecruitStatusModal.tsx
│  │  ├─ ScrollToTop.tsx
│  │  ├─ SortTab.tsx
│  │  ├─ StudyApplyModal.tsx
│  │  ├─ StudyCard.tsx
│  │  ├─ StudyDismantle.tsx
│  │  ├─ StudyLeaveModal.tsx
│  │  ├─ SwitchToggle.tsx
│  │  ├─ ToastMessage.tsx
│  │  ├─ TransientModal.tsx
│  │  ├─ mystudy
│  │  │  └─ MyStudyCard.tsx
│  │  └─ tag
│  │     ├─ EventTag.tsx
│  │     └─ StudyTag.tsx
│  ├─ components
│  │  ├─ Category
│  │  │  ├─ CategoryBanner.tsx
│  │  │  └─ CategorySectionSlider.tsx
│  │  ├─ Layout
│  │  │  ├─ AdminNavBar.tsx
│  │  │  ├─ CategoryMenu.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ MyStudySidebar.tsx
│  │  │  ├─ MypageSidebar.tsx
│  │  │  ├─ NavBar.tsx
│  │  │  └─ NavbarUserInfoDropDown.tsx
│  │  ├─ Main
│  │  │  ├─ CategoryShortcutTabs.tsx
│  │  │  ├─ JoinedStudySection.tsx
│  │  │  └─ MainBanner.tsx
│  │  ├─ auth
│  │  ├─ event
│  │  │  ├─ EventCard.tsx
│  │  │  └─ EventForm.tsx
│  │  ├─ mypage
│  │  │  ├─ messageInboxPage
│  │  │  │  ├─ InboxMessageDetail.tsx
│  │  │  │  └─ InboxMessageList.tsx
│  │  │  ├─ messageSentboxPage
│  │  │  │  ├─ SentboxMessageDetail.tsx
│  │  │  │  └─ SentboxMessageList.tsx
│  │  │  └─ studyPlannerPage
│  │  │     ├─ AttendanceCalendar.css
│  │  │     ├─ AttendanceCalendar.tsx
│  │  │     ├─ DropDownCalendar.tsx
│  │  │     ├─ ProgressBar.tsx
│  │  │     ├─ WriteTodo.tsx
│  │  │     └─ todo.tsx
│  │  ├─ search
│  │  │  ├─ SearchEmptyState.tsx
│  │  │  └─ SearchResultList.tsx
│  │  └─ study
│  │     └─ studyRoomPage
│  │        ├─ CircleTool.tsx
│  │        ├─ KonvaWhiteBoard.tsx
│  │        ├─ PenTool.tsx
│  │        ├─ StudyRoomInboxMessage.tsx
│  │        ├─ StudyRoomMessageInboxModal.tsx
│  │        ├─ StudyRoomSendMessageModal.tsx
│  │        ├─ StudyRoomToolbox.tsx
│  │        ├─ StudyRoomUserCard.tsx
│  │        └─ StudyRoomUserProfileModal.tsx
│  ├─ constants
│  │  ├─ levelOptions.ts
│  │  └─ studyOptions.ts
│  ├─ data
│  │  ├─ categoryData.ts
│  │  ├─ dummyData.ts
│  │  ├─ eventMockData.ts
│  │  ├─ mockData.ts
│  │  ├─ recruitStatusData.ts
│  │  └─ recruitStatusMock.json
│  ├─ hooks
│  │  ├─ useClickOutside.ts
│  │  ├─ useDrawingToolHook.ts
│  │  └─ useLogin.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ mystudymockdata
│  │  ├─ inboxMessageData.ts
│  │  ├─ mockStudyData.json
│  │  ├─ sentboxMessageData.ts
│  │  ├─ studyCreateOptionsData.ts
│  │  ├─ studyOptions.ts
│  │  └─ studyRoomMockData.ts
│  ├─ pages
│  │  ├─ Layout
│  │  │  ├─ Layout.tsx
│  │  │  ├─ MessageLayout.tsx
│  │  │  ├─ MyStudyLayout.tsx
│  │  │  ├─ MypageLayout.tsx
│  │  │  └─ ProtectedRoute.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ auth
│  │  │  ├─ AccountDeletePage.tsx
│  │  │  ├─ FindEmailPage.tsx
│  │  │  ├─ FindEmailSuccessPage.tsx
│  │  │  ├─ FindPasswordPage.tsx
│  │  │  ├─ MainPage.tsx
│  │  │  ├─ RequireAdmin.tsx
│  │  │  ├─ ResetPasswordPage.tsx
│  │  │  ├─ ResetPasswordSuccessPage.tsx
│  │  │  ├─ SignupPage.tsx
│  │  │  ├─ SignupTermsPage.tsx
│  │  │  └─ loginPage.tsx
│  │  ├─ category
│  │  │  ├─ CategoryDetailPage.tsx
│  │  │  ├─ CategoryPage.tsx
│  │  │  ├─ CategoryShortcutPage.tsx
│  │  │  ├─ CustomRecommendPage.tsx
│  │  │  └─ SideCategoryMenu.tsx
│  │  ├─ contact
│  │  │  └─ ContactPage.tsx
│  │  ├─ event
│  │  │  ├─ EventDetailPage.tsx
│  │  │  ├─ EventListPage.tsx
│  │  │  └─ EventMainPage.tsx
│  │  ├─ mypage
│  │  │  ├─ AccountSettingsPage.tsx
│  │  │  ├─ MessageInboxPage.tsx
│  │  │  ├─ MessageSentPage.tsx
│  │  │  ├─ MessageWritePage.tsx
│  │  │  └─ StudyPlannerPage.tsx
│  │  ├─ mystudy
│  │  │  ├─ MyStudyAppliedPage.tsx
│  │  │  ├─ MyStudyCreatedPage.tsx
│  │  │  ├─ MyStudyFavoritesPage.tsx
│  │  │  ├─ MyStudyJoinedPage.tsx
│  │  │  └─ StudyManagePage.tsx
│  │  ├─ privacy
│  │  │  └─ PrivacyPolicyPage.tsx
│  │  ├─ search
│  │  │  └─ SearchResultPage.tsx
│  │  ├─ study
│  │  │  ├─ StudyCategoryPage.tsx
│  │  │  ├─ StudyCreatePage.tsx
│  │  │  ├─ StudyCreateSuccessPage.tsx
│  │  │  └─ StudyRoomPage.tsx
│  │  └─ terms
│  │     └─ TermsOfServicePage.tsx
│  ├─ schemas
│  │  └─ signupFormSchema.ts
│  ├─ store
│  │  ├─ useAttendance.ts
│  │  ├─ useDismantledStudiesStore.ts
│  │  ├─ useInboxMessageStore.ts
│  │  ├─ useSentboxMessageStore.ts
│  │  ├─ useTodoStore.ts
│  │  └─ userInfoStore.ts
│  ├─ types
│  │  ├─ Applicant.ts
│  │  ├─ RecruitApplicant.ts
│  │  ├─ StudyCardDataType.ts
│  │  ├─ circle.ts
│  │  ├─ drawingTool.ts
│  │  ├─ errorMessage.ts
│  │  ├─ event.ts
│  │  ├─ message.ts
│  │  ├─ point.ts
│  │  ├─ signupForm.ts
│  │  ├─ study.ts
│  │  ├─ studyCreateType.ts
│  │  ├─ todo.ts
│  │  └─ userData.ts
│  ├─ utils
│  │  ├─ cn.ts
│  │  ├─ generateYearMonthOptions.ts
│  │  ├─ getAccessToken.ts
│  │  ├─ isAdmin.ts
│  │  ├─ isKakaoUser.ts
│  │  └─ toCustomDate.ts
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
```
storbit
├─ .husky
│  ├─ _
│  │  ├─ applypatch-msg
│  │  ├─ commit-msg
│  │  ├─ h
│  │  ├─ husky.sh
│  │  ├─ post-applypatch
│  │  ├─ post-checkout
│  │  ├─ post-commit
│  │  ├─ post-merge
│  │  ├─ post-rewrite
│  │  ├─ pre-applypatch
│  │  ├─ pre-auto-gc
│  │  ├─ pre-commit
│  │  ├─ pre-merge-commit
│  │  ├─ pre-push
│  │  ├─ pre-rebase
│  │  └─ prepare-commit-msg
│  ├─ commit-msg
│  └─ pre-commit
├─ .prettierrc
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  ├─ event
│  │  │  ├─ detail1.png
│  │  │  ├─ detail2.png
│  │  │  └─ thumb.png
│  │  ├─ font
│  │  │  └─ PretendardVariable.woff2
│  │  ├─ icons
│  │  │  ├─ CheckIcon.png
│  │  │  ├─ MainLogo.png
│  │  │  └─ StudyStartIcon.png
│  │  └─ mockdataimage
│  │     ├─ profile.png
│  │     └─ requestedStudy.png
│  ├─ mockServiceWorker.js
│  └─ vite.svg
├─ qodana.yaml
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ admin
│  │  └─ events
│  │     ├─ CreateEvent.tsx
│  │     └─ UpdateEvent.tsx
│  ├─ api
│  │  ├─ mainApi.ts
│  │  ├─ mswMock
│  │  │  ├─ MockData.ts
│  │  │  ├─ browser.ts
│  │  │  └─ handlers
│  │  │     ├─ authHandlers.ts
│  │  │     ├─ myStudiesHandlers.ts
│  │  │     └─ studyMakeHandlers.ts
│  │  └─ myApplications.ts
│  ├─ assets
│  │  ├─ font
│  │  │  └─ PretendardVariable.woff2
│  │  ├─ icons
│  │  │  ├─ CheckIcon.png
│  │  │  ├─ MainLogo.png
│  │  │  └─ StudyStartIcon.png
│  │  └─ images
│  │     ├─ achievement-banner.png
│  │     ├─ admin-logo.png
│  │     ├─ beginner-banner.png
│  │     ├─ best-banner.png
│  │     ├─ custom-banner.png
│  │     ├─ dawn-banner.png
│  │     ├─ deadline-banner.png
│  │     ├─ default-profile.png
│  │     ├─ default-thumbnail.png
│  │     ├─ favicon-32x32.png
│  │     ├─ hot-banner.png
│  │     ├─ logo-w.png
│  │     ├─ main01.png
│  │     └─ weekend-banner.png
│  ├─ common
│  │  ├─ ArrowNavigation.tsx
│  │  ├─ CommonButton.tsx
│  │  ├─ CommonModal.tsx
│  │  ├─ ConfirmModal
│  │  │  └─ ApplicationCompleted.tsx
│  │  ├─ ConfirmModal.tsx
│  │  ├─ DropDown.tsx
│  │  ├─ InputField.tsx
│  │  ├─ LeaderDelegateModal.tsx
│  │  ├─ LeaderMissionModal.tsx
│  │  ├─ MemberKickModal.tsx
│  │  ├─ MemberStatusModal.tsx
│  │  ├─ MissionModal.tsx
│  │  ├─ ModalWrapper.tsx
│  │  ├─ RecruitStatusModal.tsx
│  │  ├─ ScrollToTop.tsx
│  │  ├─ SortTab.tsx
│  │  ├─ StudyApplyModal.tsx
│  │  ├─ StudyCard.tsx
│  │  ├─ StudyDismantle.tsx
│  │  ├─ StudyLeaveModal.tsx
│  │  ├─ SwitchToggle.tsx
│  │  ├─ ToastMessage.tsx
│  │  ├─ TransientModal.tsx
│  │  ├─ mystudy
│  │  │  └─ MyStudyCard.tsx
│  │  └─ tag
│  │     ├─ EventTag.tsx
│  │     └─ StudyTag.tsx
│  ├─ components
│  │  ├─ Category
│  │  │  ├─ CategoryBanner.tsx
│  │  │  └─ CategorySectionSlider.tsx
│  │  ├─ Layout
│  │  │  ├─ AdminNavBar.tsx
│  │  │  ├─ CategoryMenu.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ MyStudySidebar.tsx
│  │  │  ├─ MypageSidebar.tsx
│  │  │  ├─ NavBar.tsx
│  │  │  └─ NavbarUserInfoDropDown.tsx
│  │  ├─ Main
│  │  │  ├─ CategoryShortcutTabs.tsx
│  │  │  ├─ JoinedStudySection.tsx
│  │  │  └─ MainBanner.tsx
│  │  ├─ auth
│  │  ├─ event
│  │  │  ├─ EventCard.tsx
│  │  │  └─ EventForm.tsx
│  │  ├─ mypage
│  │  │  ├─ messageInboxPage
│  │  │  │  ├─ InboxMessageDetail.tsx
│  │  │  │  └─ InboxMessageList.tsx
│  │  │  ├─ messageSentboxPage
│  │  │  │  ├─ SentboxMessageDetail.tsx
│  │  │  │  └─ SentboxMessageList.tsx
│  │  │  └─ studyPlannerPage
│  │  │     ├─ AttendanceCalendar.css
│  │  │     ├─ AttendanceCalendar.tsx
│  │  │     ├─ DropDownCalendar.tsx
│  │  │     ├─ ProgressBar.tsx
│  │  │     ├─ WriteTodo.tsx
│  │  │     └─ todo.tsx
│  │  ├─ search
│  │  │  ├─ SearchEmptyState.tsx
│  │  │  └─ SearchResultList.tsx
│  │  └─ study
│  │     └─ studyRoomPage
│  │        ├─ CircleTool.tsx
│  │        ├─ KonvaWhiteBoard.tsx
│  │        ├─ PenTool.tsx
│  │        ├─ StudyRoomInboxMessage.tsx
│  │        ├─ StudyRoomMessageInboxModal.tsx
│  │        ├─ StudyRoomSendMessageModal.tsx
│  │        ├─ StudyRoomToolbox.tsx
│  │        ├─ StudyRoomUserCard.tsx
│  │        └─ StudyRoomUserProfileModal.tsx
│  ├─ constants
│  │  ├─ levelOptions.ts
│  │  └─ studyOptions.ts
│  ├─ data
│  │  ├─ categoryData.ts
│  │  ├─ dummyData.ts
│  │  ├─ eventMockData.ts
│  │  ├─ mockData.ts
│  │  ├─ recruitStatusData.ts
│  │  └─ recruitStatusMock.json
│  ├─ hooks
│  │  ├─ useClickOutside.ts
│  │  ├─ useDrawingToolHook.ts
│  │  └─ useLogin.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ mystudymockdata
│  │  ├─ inboxMessageData.ts
│  │  ├─ mockStudyData.json
│  │  ├─ sentboxMessageData.ts
│  │  ├─ studyCreateOptionsData.ts
│  │  ├─ studyOptions.ts
│  │  └─ studyRoomMockData.ts
│  ├─ pages
│  │  ├─ Layout
│  │  │  ├─ Layout.tsx
│  │  │  ├─ MessageLayout.tsx
│  │  │  ├─ MyStudyLayout.tsx
│  │  │  ├─ MypageLayout.tsx
│  │  │  └─ ProtectedRoute.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ auth
│  │  │  ├─ AccountDeletePage.tsx
│  │  │  ├─ FindEmailPage.tsx
│  │  │  ├─ FindEmailSuccessPage.tsx
│  │  │  ├─ FindPasswordPage.tsx
│  │  │  ├─ MainPage.tsx
│  │  │  ├─ RequireAdmin.tsx
│  │  │  ├─ ResetPasswordPage.tsx
│  │  │  ├─ ResetPasswordSuccessPage.tsx
│  │  │  ├─ SignupPage.tsx
│  │  │  ├─ SignupTermsPage.tsx
│  │  │  └─ loginPage.tsx
│  │  ├─ category
│  │  │  ├─ CategoryDetailPage.tsx
│  │  │  ├─ CategoryPage.tsx
│  │  │  ├─ CategoryShortcutPage.tsx
│  │  │  ├─ CustomRecommendPage.tsx
│  │  │  └─ SideCategoryMenu.tsx
│  │  ├─ contact
│  │  │  └─ ContactPage.tsx
│  │  ├─ event
│  │  │  ├─ EventDetailPage.tsx
│  │  │  ├─ EventListPage.tsx
│  │  │  └─ EventMainPage.tsx
│  │  ├─ mypage
│  │  │  ├─ AccountSettingsPage.tsx
│  │  │  ├─ MessageInboxPage.tsx
│  │  │  ├─ MessageSentPage.tsx
│  │  │  ├─ MessageWritePage.tsx
│  │  │  └─ StudyPlannerPage.tsx
│  │  ├─ mystudy
│  │  │  ├─ MyStudyAppliedPage.tsx
│  │  │  ├─ MyStudyCreatedPage.tsx
│  │  │  ├─ MyStudyFavoritesPage.tsx
│  │  │  ├─ MyStudyJoinedPage.tsx
│  │  │  └─ StudyManagePage.tsx
│  │  ├─ privacy
│  │  │  └─ PrivacyPolicyPage.tsx
│  │  ├─ search
│  │  │  └─ SearchResultPage.tsx
│  │  ├─ study
│  │  │  ├─ StudyCategoryPage.tsx
│  │  │  ├─ StudyCreatePage.tsx
│  │  │  ├─ StudyCreateSuccessPage.tsx
│  │  │  └─ StudyRoomPage.tsx
│  │  └─ terms
│  │     └─ TermsOfServicePage.tsx
│  ├─ schemas
│  │  └─ signupFormSchema.ts
│  ├─ store
│  │  ├─ useAttendance.ts
│  │  ├─ useDismantledStudiesStore.ts
│  │  ├─ useInboxMessageStore.ts
│  │  ├─ useSentboxMessageStore.ts
│  │  ├─ useTodoStore.ts
│  │  └─ userInfoStore.ts
│  ├─ types
│  │  ├─ Applicant.ts
│  │  ├─ RecruitApplicant.ts
│  │  ├─ StudyCardDataType.ts
│  │  ├─ circle.ts
│  │  ├─ drawingTool.ts
│  │  ├─ errorMessage.ts
│  │  ├─ event.ts
│  │  ├─ message.ts
│  │  ├─ point.ts
│  │  ├─ signupForm.ts
│  │  ├─ study.ts
│  │  ├─ studyCreateType.ts
│  │  ├─ todo.ts
│  │  └─ userData.ts
│  ├─ utils
│  │  ├─ cn.ts
│  │  ├─ generateYearMonthOptions.ts
│  │  ├─ getAccessToken.ts
│  │  ├─ isAdmin.ts
│  │  ├─ isKakaoUser.ts
│  │  └─ toCustomDate.ts
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```