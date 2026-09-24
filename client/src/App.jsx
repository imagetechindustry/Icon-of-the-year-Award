import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LazyMotion, domMax } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuroraBackground } from "./components/Motion.jsx";

// Pages with Code Splitting
const Home = lazy(() => import("./pages/Home"));
const Categories = lazy(() => import("./pages/Categories"));
const Jury = lazy(() => import("./pages/Jury"));
const Guidelines = lazy(() => import("./pages/Guidelines"));
const Judging = lazy(() => import("./pages/Judging"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));
const Media = lazy(() => import("./pages/Media.jsx"));
const EditionDetail = lazy(() => import("./pages/EditionDetail.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const NominationForm = lazy(() => import("./pages/NominationForm.jsx"));
const UserDashboard = lazy(() => import("./pages/UserDashboard.jsx"));
const NominationDetails = lazy(() => import("./pages/NominationDetails.jsx"));
const SuccessPage = lazy(() => import("./pages/SuccessPage.jsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.jsx"));
const AdminRegister = lazy(() => import("./pages/AdminRegister.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail.jsx"));
const AuthCallback = lazy(() => import("./pages/AuthCallback.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const DeveloperAuth = lazy(() => import("./pages/DeveloperAuth.jsx"));
const PreviousEditions = lazy(() => import("./pages/PreviousEditions.jsx"));
const UpcomingAwards = lazy(() => import("./components/UpcomingAwards.jsx"));
const UpcomingEditionDetail = lazy(() => import("./pages/UpcomingEditionDetail.jsx"));

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import CallButton from "./components/CallButton.jsx";
import QuickAccess from "./pages/QuickAccess.jsx";


export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-indigo-100">
            <div className="w-12 h-12 border-4 border-white/20 border-t-indigo-400 rounded-full animate-spin mb-4" />
            <p className="text-sm font-bold tracking-widest uppercase animate-pulse text-indigo-300">Loading...</p>
          </div>
        }>
          <LazyMotion features={domMax} strict>
            <AuroraBackground>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/auth-callback" element={<AuthCallback />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/jury" element={<Jury />} />
                <Route path="/guidelines" element={<Guidelines />} />
                <Route path="/judging" element={<Judging />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/media" element={<Media />} />
                <Route path="/previous-editions" element={<PreviousEditions />} />
                <Route path="/upcoming-awards" element={<UpcomingAwards />} />
                <Route path="/upcoming-editions/:year/:slug" element={<UpcomingEditionDetail />} />
                <Route path="/editions/:year" element={<EditionDetail />} />
                <Route path="/:year/:slug" element={<EditionDetail />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/nominate" element={<NominationForm />} />
                <Route path="/nominate/:id" element={<NominationForm />} />
                <Route path="/nomination/:id" element={<NominationDetails />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["user"]}>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/developer" element={<DeveloperAuth />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </AuroraBackground>
          </LazyMotion>
        </Suspense>
      </main>



      {!location.pathname.startsWith("/admin") && <Footer />}
      {!location.pathname.startsWith("/admin") && (
        <>
          <WhatsAppButton />
          <CallButton />
          <QuickAccess />
        </>
      )}
    </div >
  );
}
