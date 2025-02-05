import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { Toaster } from "sonner";
import Feed from "./pages/Feed";
import ProfilePage from "./pages/ProfilePage";
import RequestsReceivedPage from "./pages/RequestsReceivedPage";
import Connections from "./pages/Connections";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import Policy from "./pages/Policy";
import ChatPage from "./pages/ChatPage";
import AccountSettings from "./pages/AccountSettings";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <Toaster richColors position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/connectionRequests"
                element={<RequestsReceivedPage />}
              />
              <Route path="/connections" element={<Connections />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/:targetUserId" element={<ChatPage />} />
              <Route path="/privacy-policy" element={<Policy />} />
              <Route path="/account-settings" element={<AccountSettings />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
