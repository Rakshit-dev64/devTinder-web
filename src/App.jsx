import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import store from "./utils/store";
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <Provider store = {store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={
              // <ProtectedRoute>
                <Body />
              // </ProtectedRoute>
            }>
              <Route index element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
