import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { checkAuth } from "./services/auth";
import Blog from "./pages/blog/Blog";
import BlogArticle from "./pages/blog/BlogArticle";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import { Navbar } from "./components/navbar";
import Register from "./pages/auth/Register";
import { Footer } from "./pages/Footer";
import About from "./pages/about/About";
import Landing from "./pages/landing/Landing";
import Terms from "./pages/terms/Terms";
import AddReview from "./pages/review/AddReview";
import PrivacyPolicy from "./pages/privacy/Privacy";
import Offer from "./pages/offer/Offer";
import HowItWorks from "./pages/how-it-works/How-it-works";
import CookiesPolicy from "./pages/cookies/Cookies";
import Contact from "./pages/contact/Contact";
import Cars from "./pages/cars/Cars";
import CarDetails from "./pages/cars/CarDetails";
import Profile from "./pages/profile/Profile";
import { BASE_PATH } from "./lib/constant";

function App() {
  const isAuthenticated = checkAuth(); // folosim auth.ts

  return (
    <Router basename={BASE_PATH}>
      <Navbar />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offer"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Offer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cars/:id/review"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddReview />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
