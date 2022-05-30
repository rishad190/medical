import "bootstrap/dist/js/bootstrap";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import { createContext, useState } from "react";
import { ProtectedRoute } from "./Components/PrivateRoute";
import LivePage from "./Components/LivePage";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    error: "",
    password: "",
    success: false,
  });
  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="live" element={<LivePage />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
