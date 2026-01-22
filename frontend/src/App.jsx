import { Routes, Route } from "react-router";
import { LoginPage } from "./pages/LoginPage.jsx";
import { ProtectedRute } from "./auth/ProtectedRoute.jsx";
import { PublicRoute } from "./auth/PublicRoute.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
