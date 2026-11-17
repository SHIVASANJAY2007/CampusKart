import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Buying from "./pages/Buying";
import Selling from "./pages/Selling";
import Community from "./pages/Community";
import Profile from "./pages/Profile";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MapButton from "./components/MapButton";
import CampusMap from "./components/CampusMap";

export default function App() {
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <Router>
      <div className="bg-white min-h-screen text-[#2B303B] font-sans">

        {/* 
          👉 Navbar should NOT show on Login Page 
          So we show it ONLY when route is NOT "/"
        */}
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />

          {/* All other pages get Navbar + Components */}
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <main className="container mx-auto p-4">
                  <Home />
                </main>
                <Footer />
              </>
            }
          />

          <Route
            path="/buying"
            element={
              <>
                <Navbar />
                <main className="container mx-auto p-4">
                  <Buying />
                </main>
                <Footer />
              </>
            }
          />

          <Route
            path="/selling"
            element={
              <>
                <Navbar />
                <main className="container mx-auto p-4">
                  <Selling />
                </main>
                <Footer />
              </>
            }
          />

          <Route
            path="/community"
            element={
              <>
                <Navbar />
                <main className="container mx-auto p-4">
                  <Community />
                </main>
                <Footer />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <main className="container mx-auto p-4">
                  <Profile />
                </main>
                <Footer />
              </>
            }
          />
        </Routes>

        {/* Campus Map Button only visible after login */}
        {showMap && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-75 flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
              <button
                onClick={toggleMap}
                className="absolute top-4 right-4 z-50 text-white text-2xl font-bold bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                &times;
              </button>
              <CampusMap />
            </div>
          </div>
        )}

        {/* Floating Map button (not visible on login page) */}
        {window.location.pathname !== "/" && (
          <MapButton onClick={toggleMap} />
        )}
      </div>
    </Router>
  );
}
