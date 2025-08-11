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
import MessageWritePage from '@/pages/mypage/MessageWritePage'
import SearchResultPage from '@/pages/search/SearchResultPage'
import EventMainPage from '@/pages/event/EventMainPage'
import EventDetailPage from '@/pages/event/EventDetailPage'
import Layout from '@/pages/Layout/Layout'
import MyStudyLayout from '@/pages/Layout/MyStudyLayout'
import MypageLayout from '@/pages/Layout/MypageLayout'
import AccountDeletePage from '@/pages/auth/AccountDeletePage'
import MessageLayout from '@/pages/Layout/MessageLayout'
import NotFound from '@/pages/NotFound'
import TermsOfServicePage from '@/pages/terms/TermsOfServicePage'
import PrivacyPolicyPage from '@/pages/privacy/PrivacyPolicyPage'
import ContactPage from '@/pages/contact/ContactPage'
import CategoryPage from '@/pages/category/CategoryPage'
import CategoryDetailPage from '@/pages/category/CategoryDetailPage'
import StudyManagePage from '@/pages/mystudy/StudyManagePage.tsx'
import CreateEventPage from '@/admin/events/CreateEvent.tsx'
import UpdateEventPage from '@/admin/events/UpdateEvent.tsx'
import CategoryShortcutPage from '@/pages/category/CategoryShortcutPage'
import CustomRecommendPage from '@/pages/category/CustomRecommendPage'


export default function App() {
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
        <Route path="/auth/account-delete" element={<AccountDeletePage />} />

        {/*카테고리*/}
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route
          path="/category/:category/:subcategory"
          element={<CategoryDetailPage />}
        />
        <Route path="/studies" element={<CategoryShortcutPage />} />
        <Route path="/studies/custom" element={<CustomRecommendPage />} />

        {/* 스터디 */}
        <Route path="/study/create" element={<StudyCreatePage />} />
        <Route
          path="/study/create/success"
          element={<StudyCreateSuccessPage />}
        />
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
          <Route path="/study/manage/:studyId" element={<StudyManagePage />} />
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
              element={<MessageWritePage />}
            />
          </Route>
        </Route>

        {/* 검색 & 이벤트 */}
        <Route path="/search/:query" element={<SearchResultPage />} />
        <Route path="/event" element={<EventMainPage />} />
        <Route path="/event/:eventid" element={<EventDetailPage />} />
        <Route path="/admin/events/create" element={<CreateEventPage />} />
        <Route
          path="/admin/events/update/:eventid"
          element={<UpdateEventPage />}
        />
        <Route path="*" element={<NotFound />} />

        {/* 약관, 개인정보처리방침, 문의하기 */}
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      <Route path="/study/:roomid" element={<StudyRoomPage />} />
    </Routes>
  )
}
