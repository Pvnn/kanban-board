import { Routes, Route } from "react-router";
import { LoginPage } from "./pages/LoginPage.jsx";
import { ProtectedRute } from "./auth/ProtectedRoute.jsx";
import { PublicRoute } from "./auth/PublicRoute.jsx";
import { TaskBoard } from "./pages/TaskBoard.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import "./App.css";
import { Dashboard } from "./pages/Dashboard.jsx";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskBoard />} />
      </Route>
    </Routes>
  );
}

export default App;
