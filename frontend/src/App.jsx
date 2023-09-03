import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPageUser from "./pages/LoginUser";
import "./styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="/login/user" element={<LoginPageUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
