import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <div className="w-screen min-h-screen bg-[#000814] flex flex-col">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/login" element={<Login />} />

        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
    </div>
  );
}

export default App;
