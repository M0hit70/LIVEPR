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
        .scroll-panel {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 #05000b;
        }
        .scroll-panel::-webkit-scrollbar {
          width: 8px;
        }
        .scroll-panel::-webkit-scrollbar-track {
          background: #05000b;
          border-radius: 999px;
        }
        .scroll-panel::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8b5cf6, #4c1d95);
          border-radius: 999px;
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
                <span className="w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-[13px]">
                  ←
                </span>
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
              <div className="bg-black/85 border border-white/15 rounded-3xl px-5 sm:px-7 md:px-8 py-5 sm:py-7 shadow-[0_0_30px_rgba(0,0,0,1)] scroll-panel max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    {mode === "login" ? "Login to your account" : "Create your account"}
                  </h2>
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="inline-flex items-center gap-2 text-[11px] sm:text-xs md:text-sm px-3 py-1.5 rounded-full border border-white/30 bg-black/60 text-white/80 hover:text-white hover:border-[#c4b5fd] hover:bg-black transition-all duration-200"
                  >
                    <span>{mode === "login" ? "New here?" : "Already a member?"}</span>
                    <span className="font-semibold text-[#c4b5fd]">
                      {mode === "login" ? "Sign up" : "Login"}
                    </span>
                  </button>
                </div>

                <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                  {mode === "signup" && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] sm:text-xs text-white/80">Full Name</span>
                      <input
                        type="text"
                        required
                        className="w-full rounded-full px-4 py-2.5 bg-black border border-white/20 text-[11px] sm:text-xs md:text-sm focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                        placeholder="Enter your name"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] sm:text-xs text-white/80">Email</span>
                    <input
                      type="email"
                      required
                      className="w-full rounded-full px-4 py-2.5 bg-black border border-white/20 text-[11px] sm:text-xs md:text-sm focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] sm:text-xs text-white/80">Password</span>
                    <input
                      type="password"
                      required
                      className="w-full rounded-full px-4 py-2.5 bg-black border border-white/20 text-[11px] sm:text-xs md:text-sm focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                      placeholder="••••••••"
                    />
                  </div>

                  {mode === "signup" && (
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/70">
                      <input
                        type="checkbox"
                        required
                        className="w-3.5 h-3.5 accent-[#a855f7]"
                      />
                      <span>
                        I agree to the Terms of Service and Privacy Policy.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-2 rounded-full px-4 py-2.7 sm:py-3 text-sm sm:text-base font-semibold bg-gradient-to-r from-white via-slate-100 to-white text-black tracking-wide hover:from-[#a855f7] hover:via-[#7c3aed] hover:to-[#4c1d95] hover:text-white hover:shadow-[0_0_22px_rgba(168,85,247,0.9)] transition-all duration-200"
                  >
                    {mode === "login" ? "Login" : "Create account"}
                  </button>
                </form>

                <p className="mt-4 text-[9px] sm:text-[10px] text-white/55 text-center">
                  This is a demo authentication flow. After submit you will be taken back to the dashboard.
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
