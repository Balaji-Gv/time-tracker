import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import TimeSheet from "./pages/TimeSheet";
import TimeTracker from "./pages/TimeTracker";
import Login from "./pages/Login"; // Add Login component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        {isAuthenticated && <Header onLogout={handleLogout} />}
        <div className="flex flex-1">
          {isAuthenticated && <Sidebar />}
          <main className="flex-1 p-6 rounded-3xl bg-gray-100">
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/"
                element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/about"
                element={isAuthenticated ? <About /> : <Navigate to="/login" />}
              />
              <Route
                path="/timeTracker"
                element={
                  isAuthenticated ? <TimeTracker /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/timeSheet"
                element={
                  isAuthenticated ? <TimeSheet /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
