// ==============================
// App.jsx
// Updated
// ==============================

import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppRoutes from "./AppRoutes";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/recruiter");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;