import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import Login from "./pages/login";
import AuthProvider from "./context/AuthProvider";
import Dashboard from "./pages/dashboard";
import NavBar from "./components/Navbar";
import PermissionDashboard from "./pages/permissionDashboard";
import RoomStatusUpdate from "./components/Room/RoomStatusUpdate";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/permissions" element={<PermissionDashboard />} />
        <Route path="/rooms/status" element={<RoomStatusUpdate />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter >,
);
