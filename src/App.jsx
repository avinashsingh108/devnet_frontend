import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import appStore from "./store/appStore";

import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import RequestsReceivedPage from "./pages/RequestsReceivedPage";
import Connections from "./pages/Connections";
import AboutUs from "./pages/AboutUs";
import Policy from "./pages/Policy";
import ChatPage from "./pages/ChatPage";
import AccountSettings from "./pages/AccountSettings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Provider store={appStore}>
      <Toaster
        richColors
        closeButton
        position="top-center"
        toastOptions={{ className: "font-['Outfit']" }}
      />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Home />}>
            <Route path="/" element={<LandingPage />} />
            <Route element={<PublicRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="about" element={<AboutUs />} />
            <Route path="privacy-policy" element={<Policy />} />
            <Route element={<ProtectedRoute />}>
              <Route path="feed" element={<Feed />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route
                path="connectionRequests"
                element={<RequestsReceivedPage />}
              />
              <Route path="connections" element={<Connections />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="chat/:targetUserId" element={<ChatPage />} />
              <Route path="account-settings" element={<AccountSettings />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
