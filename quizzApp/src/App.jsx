import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import QuizApp from "./Pages/Question";
import AuthPage from "./Pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<QuizApp />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
