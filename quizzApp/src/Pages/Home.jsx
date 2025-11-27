import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.jpg";
import textureImg from "../assets/texture.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [topicName, setTopicName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [contentType, setContentType] = useState("Lecture");

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      setPdfFile(null);
      alert("Please upload a PDF file only.");
    }
  };

  const handleGenerate = () => {
    navigate("/quiz", {
      state: {
        subject,
        topicName,
        hasPdf: !!pdfFile,
        contentType,
      },
    });
  };

  const goToAuth = () => {
    navigate("/auth");
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
        @keyframes sidebarSlideIn {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .sidebar-anim { animation: sidebarSlideIn 0.5s ease-out; }

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
        .scroll-panel::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #c4b5fd, #7c3aed);
        }

        @media (max-width: 768px) {
          html, body { overflow: auto; }
        }
      `}</style>

      <div
        className="h-screen w-screen bg-black bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/80" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -inset-28 bg-gradient-to-tr from-[#7a1bca]/40 via-transparent to-[#4e0f9c]/70 blur-3xl opacity-80" />
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage: `url(${textureImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="relative h-full w-full flex items-center justify-center px-3 sm:px-6">
          <div className="flex w-full max-w-6xl h-[82vh] rounded-3xl overflow-hidden shadow-[0_0_45px_rgba(0,0,0,1)] bg-black/60 backdrop-blur-2xl border border-white/5">
            <aside className="w-[26%] min-w-[230px] bg-gradient-to-b from-[#7a1bca] to-[#4e0f9c] text-white flex flex-col justify-between sidebar-anim">
              <div className="p-4 sm:p-6 flex flex-col gap-6 sm:gap-7">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#7a1bca] via-[#a855f7] to-[#4e0f9c] flex items-center justify-center text-[11px] font-extrabold tracking-[0.16em] shadow-[0_0_14px_rgba(0,0,0,0.9)]">
                    QZ
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg sm:text-xl font-extrabold leading-tight">
                      GenQuiz
                    </span>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/70">
                      AI Quiz Builder
                    </span>
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-white/85 max-w-xs">
                  Turn your PDF notes into smart, topic-wise quizzes in seconds.
                </p>

                <nav className="flex flex-col gap-3 text-sm sm:text-base mt-2">
                  <button
                    type="button"
                    className="flex items-center justify-between px-3 py-2.5 rounded-2xl bg-black/35 border border-white/40 shadow-[0_0_16px_rgba(0,0,0,0.8)] hover:bg-black/60 transition-all duration-200"
                  >
                    <span className="font-semibold">Dashboard</span>
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 text-black font-semibold shadow-[0_0_12px_rgba(74,222,128,0.9)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      Active
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={goToAuth}
                    className="flex items-center justify-between px-3 py-2.5 rounded-2xl bg-black/10 border border-white/25 hover:bg-black/35 hover:border-white hover:shadow-[0_0_18px_rgba(0,0,0,0.8)] transition-all duration-200"
                  >
                    <span className="font-semibold text-sm sm:text-base">
                      Login / Signup
                    </span>
                    <span className="w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-xs">
                      ↗
                    </span>
                  </button>
                </nav>
              </div>

              <div className="px-4 sm:px-6 py-3 text-[10px] sm:text-[11px] text-white/80 border-t border-white/20">
                <span className="block uppercase tracking-[0.18em] text-white/60 mb-0.5">
                  Ready to start?
                </span>
                <div className="text-[11px] sm:text-xs">
                  Upload your notes and generate a quiz.
                </div>
              </div>
            </aside>

            <main className="flex-1 flex items-center justify-center px-4 sm:px-8">
              <div className="w-full max-w-xl text-white h-[74vh] sm:h-[76vh]">
                <div className="bg-black/80 border border-white/15 rounded-3xl shadow-[0_0_26px_rgba(0,0,0,0.9)] h-full flex flex-col">
                  <div className="px-5 sm:px-7 pt-4 sm:pt-5 pb-2 text-center">
                    <h1 className="text-xl sm:text-2xl md:text-[1.9rem] font-extrabold tracking-wide mb-1 leading-tight">
                      Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-white/80">
                      Create AI-generated MCQs from your PDF notes.
                    </p>
                  </div>

                  <div className="scroll-panel flex-1 px-5 sm:px-7 pb-4 space-y-4 sm:space-y-5 overflow-y-auto">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[11px] sm:text-xs md:text-sm text-white/80 mb-1">
                        Subject
                      </span>
                      <input
                        list="subjectOptions"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Type a subject or pick from suggestions"
                        className="w-full rounded-full px-4 py-2.5 sm:py-3 bg-black border border-white/20 text-[11px] sm:text-xs md:text-sm placeholder:text-white/40 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                      />
                      <datalist id="subjectOptions">
                        <option value="React" />
                        <option value="Tailwind CSS" />
                        <option value="JavaScript ES6" />
                        <option value="Node.js" />
                        <option value="Operating Systems" />
                        <option value="DBMS" />
                      </datalist>
                    </div>

                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[11px] sm:text-xs md:text-sm text-white/80 mb-1">
                        Enter Topic Name
                      </span>
                      <input
                        type="text"
                        value={topicName}
                        onChange={(e) => setTopicName(e.target.value)}
                        placeholder="e.g. React Hooks, Flexbox, Async JS..."
                        className="w-full rounded-full px-4 py-2.5 sm:py-3 bg-black border border-white/20 text-[11px] sm:text-xs md:text-sm placeholder:text-white/40 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                      />
                    </div>

                    <div className="flex flex-col items-center gap-2 mt-1">
                      <span className="text-[11px] sm:text-xs md:text-sm text-white/80 self-start mb-1">
                        Upload PDF Notes
                      </span>
                      <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-white/30 rounded-3xl px-4 py-5 sm:py-6 cursor-pointer bg-black/60 hover:bg-black/80 hover:border-white/70 transition-all duration-200">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl bg-black flex items-center justify-center mb-2 border border-white/30">
                          <span className="text-xl sm:text-2xl">📄</span>
                        </div>
                        <span className="text-[11px] sm:text-xs md:text-sm font-medium text-center">
                          {pdfFile ? pdfFile.name : "Click to browse PDF"}
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-white/60 mt-1">
                          Max size 10 MB • PDF only
                        </span>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={handlePdfChange}
                        />
                      </label>
                    </div>

                    <div className="border border-white/10 rounded-2xl px-4 py-3 flex flex-col gap-2 bg-black/70 mt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] sm:text-xs md:text-sm text-white/80">
                          Content type
                        </span>
                        <span className="text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full bg-[#7a1bca]/40 border border-[#a855f7]/80 uppercase tracking-[0.16em] text-white/90">
                          AI Mode
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {["Lecture", "Notes", "Practice"].map((mode) => {
                          const active = contentType === mode;
                          return (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setContentType(mode)}
                              className={`px-4 py-1.5 rounded-full text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-200 ${
                                active
                                  ? "bg-gradient-to-r from-white via-slate-100 to-white text-black shadow-[0_0_14px_rgba(255,255,255,0.65)]"
                                  : "bg-black/60 border border-white/35 text-white/80 hover:border-white hover:text-white hover:bg-black"
                              }`}
                            >
                              {mode}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-white/70 mt-1">
                        GenQuiz uses AI to understand your {contentType.toLowerCase()} and turn it into topic-wise quizzes.
                      </p>
                    </div>

                    <div className="pt-1 pb-2">
                      <button
                        type="button"
                        onClick={handleGenerate}
                        className="w-full rounded-full px-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base font-semibold bg-gradient-to-r from-white via-slate-100 to-white text-black tracking-wide hover:from-[#a855f7] hover:via-[#7c3aed] hover:to-[#4c1d95] hover:text-white transition-all duration-200 hover:shadow-[0_0_22px_rgba(168,85,247,0.9)]"
                      >
                        Generate Quiz
                      </button>
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-white/60 mt-2 text-center">
                        After clicking, you will be redirected to the MCQ page to start answering questions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
