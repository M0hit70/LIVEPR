import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.jpg";
import textureImg from "../assets/texture.jpg";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        html, body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background-color: #02010a;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          html, body { overflow: auto; }
        }
      `}</style>

      <div
        className="h-screen w-screen bg-black bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/85" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -inset-32 bg-gradient-to-tr from-[#7a1bca]/45 via-transparent to-[#4e0f9c]/70 blur-3xl opacity-90" />
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage: `url(${textureImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="relative h-full flex items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
            <div className="flex-1 text-white flex flex-col justify-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="mb-4 inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white transition"
              >
                <span className="text-lg">←</span>
                <span>Back to Dashboard</span>
              </button>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-3">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-white via-[#e9d5ff] to-white bg-clip-text text-transparent">
                  GenQuiz
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-white/80 mb-4 max-w-md">
                Sign in to sync your quizzes, track progress and save topic-wise results powered by AI.
              </p>

              <ul className="text-[11px] sm:text-xs md:text-sm text-white/75 space-y-1.5">
                <li>• Save quiz sessions and continue later.</li>
                <li>• View detailed topic analytics.</li>
                <li>• Generate unlimited MCQs from notes.</li>
              </ul>
            </div>

            <div className="flex-1">
              <div className="bg-black/85 border border-white/15 rounded-3xl px-5 sm:px-7 md:px-8 py-5 sm:py-7 shadow-[0_0_30px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    {mode === "login" ? "Login to your account" : "Create an account"}
                  </h2>
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-[10px] sm:text-xs text-white/70 hover:text-white underline-offset-2 hover:underline"
                  >
                    {mode === "login"
                      ? "New here? Sign up"
                      : "Have an account? Login"}
                  </button>
                </div>

                <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                  {mode === "signup" && (
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] sm:text-xs text-white/80">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-full px-4 py-2.5 bg-black border border-white/20 text-[11px] sm:text-xs md:text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                        placeholder="Enter your name"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] sm:text-xs text-white/80">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full rounded-full px-4 py-2.5 bg-black border border-white/20 text-[11px] sm:text-xs md:text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] sm:text-xs text-white/80">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full rounded-full px-4 py-2.5 bg-black border border-white/20 text-[11px] sm:text-xs md:text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                      placeholder="••••••••"
                    />
                  </div>

                  {mode === "signup" && (
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/70">
                      <input
                        type="checkbox"
                        required
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 accent-[#7a1bca]"
                      />
                      <span>
                        I agree to the Terms of Service and Privacy Policy.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-2 rounded-full px-4 py-2.5 sm:py-3 text-sm sm:text-base font-bold bg-white text-black hover:bg-[#7a1bca] hover:text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(122,27,202,0.9)]"
                  >
                    {mode === "login" ? "Login" : "Create account"}
                  </button>
                </form>

                <p className="mt-3 text-[9px] sm:text-[10px] text-white/55 text-center">
                  This is a demo authentication flow. You will be taken back to the dashboard after submit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
