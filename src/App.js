import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";

function App() {
  return (
    <div className="w-screen min-h-screen bg-[#000814] flex flex-col">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/login" element={<Login />} />

        <Route path="/changePassword" element={<ChangePassword />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/addCourse" element={<AddCourse />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
