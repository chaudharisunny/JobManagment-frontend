import { BrowserRouter, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"

function Layout() {

  const location = useLocation()

  const hideNavbar =
    location.pathname.startsWith("/recruiter") ||
    location.pathname.startsWith("/admin")

  return (
    <>
      {!hideNavbar && <Navbar />}

      <AppRoutes />
    </>
  )
}

function App() {

  return (
    <BrowserRouter>

      <Layout />

    </BrowserRouter>
  )
}

export default App