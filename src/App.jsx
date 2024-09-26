import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import TimeSheet from "./pages/TimeSheet";
import TimeTracker from "./pages/TimeTracker";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 rounded-3xl bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/timeTracker" element={<TimeTracker />} />
              <Route path="/timeSheet" element={<TimeSheet />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
