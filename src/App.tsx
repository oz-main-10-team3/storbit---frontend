import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from '@/pages/auth/MainPage'
import LoginPage from '@/pages/auth/loginPage'
import SignupPage from '@/pages/auth/SignupPage'
import SignupTermsPage from '@/pages/auth/SignupTermsPage'
import FindPasswordPage from '@/pages/auth/FindPasswordPage'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage'
import ResetPasswordSuccessPage from '@/pages/auth/ResetPasswordSuccessPage'
import FindEmailPage from '@/pages/auth/FindEmailPage'
import FindEmailSuccessPage from '@/pages/auth/FindEmailSuccessPage'
import StudyCreatePage from '@/pages/study/StudyCreatePage'
import StudyCreateSuccessPage from '@/pages/study/StudyCreateSuccessPage'
import StudyRoomPage from '@/pages/study/StudyRoomPage'
import StudyCategoryPage from '@/pages/study/StudyCategoryPage'
import MyStudyAppliedPage from '@/pages/mystudy/MyStudyAppliedPage'
import MyStudyJoinedPage from '@/pages/mystudy/MyStudyJoinedPage'
import MyStudyCreatedPage from '@/pages/mystudy/MyStudyCreatedPage'
import MyStudyFavoritesPage from '@/pages/mystudy/MyStudyFavoritesPage'
import AccountSettingsPage from '@/pages/mypage/AccountSettingsPage'
import StudyPlannerPage from '@/pages/mypage/StudyPlannerPage'
import MessageInboxPage from '@/pages/mypage/MessageInboxPage'
import MessageSentPage from '@/pages/mypage/MessageSentPage'
import MessageComposePage from '@/pages/mypage/MessageComposePage'
import SearchResultPage from '@/pages/search/SearchResultPage'
import EventMainPage from '@/pages/event/EventMainPage'
import EventDetailPage from '@/pages/event/EventDetailPage'
import Layout from '@/pages/Layout/Layout'
import MyStudyLayout from '@/pages/Layout/MyStudyLayout'
import MypageLayout from '@/pages/Layout/MypageLayout'
import AccountDeletePage from '@/pages/auth/AccountDeletePage'
import MessageLayout from '@/pages/Layout/MessageLayout'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 메인 & 인증 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/signup/terms" element={<SignupTermsPage />} />
        <Route path="/auth/find-password" element={<FindPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/auth/reset-password/success"
          element={<ResetPasswordSuccessPage />}
        />
        <Route path="/auth/find-email" element={<FindEmailPage />} />
        <Route
          path="/auth/find-email/success"
          element={<FindEmailSuccessPage />}
        />
        <Route path="auth/account-delete" element={<AccountDeletePage />} />

        {/* 스터디 */}
        <Route path="/study/create" element={<StudyCreatePage />} />
        <Route
          path="/study/create/success"
          element={<StudyCreateSuccessPage />}
        />
        <Route path="/study/:roomid" element={<StudyRoomPage />} />
        <Route
          path="/study/category/:category"
          element={<StudyCategoryPage />}
        />

        {/* 나의 스터디 */}
        <Route element={<MyStudyLayout />}>
          <Route path="/mystudy/applied" element={<MyStudyAppliedPage />} />
          <Route path="/mystudy/joined" element={<MyStudyJoinedPage />} />
          <Route path="/mystudy/created" element={<MyStudyCreatedPage />} />
          <Route path="/mystudy/favorites" element={<MyStudyFavoritesPage />} />
        </Route>

        {/* 마이페이지 */}
        <Route element={<MypageLayout />}>
          <Route path="/mypage/account" element={<AccountSettingsPage />} />
          <Route path="/mypage/planner" element={<StudyPlannerPage />} />
          <Route element={<MessageLayout />}>
            <Route
              path="/mypage/messages/inbox"
              element={<MessageInboxPage />}
            />
            <Route path="/mypage/messages/sent" element={<MessageSentPage />} />
            <Route
              path="/mypage/messages/compose"
              element={<MessageComposePage />}
            />
          </Route>
        </Route>

        {/* 검색 & 이벤트 */}
        <Route path="/search/:query" element={<SearchResultPage />} />
        <Route path="/event" element={<EventMainPage />} />
        <Route path="/event/:eventid" element={<EventDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
