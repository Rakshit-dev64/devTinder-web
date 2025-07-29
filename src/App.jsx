import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import store from "./utils/store";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  return (
    <div className="min-h-screen w-full global-bg text-white">
      <Provider store = {store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/password/reset" element={<ForgetPassword/>} />
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="chat/:otherUserId" element={<Chat/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
