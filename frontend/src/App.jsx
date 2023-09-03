import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import "./styles/index.css";
import SignupPage from "./pages/Signup";
import { Notification } from "./components/notification";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>Home</>} />
          <Route path="/login/user" element={<LoginPage role="user" />} />
          <Route path="/login/agent" element={<LoginPage role="agent" />} />
          <Route path="/register/user" element={<SignupPage role="user" />} />
          <Route path="/register/agent" element={<SignupPage role="agent" />} />
        </Routes>
      </BrowserRouter>
      <Notification />
    </>
  );
}

export default App;
