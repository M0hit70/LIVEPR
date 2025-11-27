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
        @media (max-width: 768px) {
          html, body { overflow: auto; }
        }
        @keyframes sidebarSlideIn {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .sidebar-anim { animation: sidebarSlideIn 0.5s ease-out; }
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
            <aside className="w-[26%] min-w-[220px] bg-gradient-to-b from-[#7a1bca] to-[#4e0f9c] text-white flex flex-col justify-between sidebar-anim">
              <div className="p-4 sm:p-6 flex flex-col gap-6 sm:gap-7">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-2xl bg-black flex items-center justify-center text-xs font-extrabold tracking-[0.22em]">
                      GQ
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
                  <p className="text-[11px] sm:text-xs text-white/80 max-w-xs">
                    Turn your PDF notes into smart, topic-wise quizzes in seconds.
                  </p>
                </div>

                <nav className="flex flex-col gap-3 text-sm sm:text-base">
                  <button
                    type="button"
                    className="flex items-center justify-between px-3 py-2.5 rounded-2xl bg-black/30 border border-white/40 shadow-md hover:bg-black/50 hover:shadow-[0_0_18px_rgba(0,0,0,0.8)] transition-all duration-200"
                  >
                    <span className="font-semibold">Dashboard</span>
                    <span className="text-[10px] sm:text-xs bg-white/15 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={goToAuth}
                    className="flex items-center justify-between px-3 py-2.5 rounded-2xl bg-black/10 border border-white/20 hover:bg-black/35 hover:border-white hover:shadow-[0_0_18px_rgba(0,0,0,0.8)] transition-all duration-200"
                  >
                    <span className="font-semibold text-sm sm:text-base">
                      Login / Signup
                    </span>
                    <span className="text-xs opacity-85">{">"}</span>
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
              <div className="w-full max-w-xl text-white">
                <div className="mt-2 sm:mt-3 mb-4 sm:mb-5 text-center">
                  <h1 className="text-xl sm:text-2xl md:text-[1.9rem] font-extrabold tracking-wide mb-1 leading-tight">
                    Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-white/80">
                    Create AI-generated MCQs from your PDF notes.
                  </p>
                </div>

                <div className="bg-black/80 border border-white/15 rounded-3xl px-4 sm:px-7 md:px-8 py-5 sm:py-6 md:py-7 shadow-[0_0_26px_rgba(0,0,0,0.9)] flex flex-col gap-4 sm:gap-5">
                  <div className="flex flex-col items-start gap-1">
                    <label className="text-[11px] sm:text-xs md:text-sm text-white/80 mb-1">
                      Subject
                    </label>
                    <input
                      list="subjectOptions"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Type a subject or pick from suggestions"
                      className="w-full rounded-full px-4 py-2.5 sm:py-3 bg-black border border-white/20 text-[11px] sm:text-xs md:text-sm placeholder:text-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
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
                    <label className="text-[11px] sm:text-xs md:text-sm text-white/80 mb-1">
                      Enter Topic Name
                    </label>
                    <input
                      type="text"
                      value={topicName}
                      onChange={(e) => setTopicName(e.target.value)}
                      placeholder="e.g. React Hooks, Flexbox, Async JS..."
                      className="w-full rounded-full px-4 py-2.5 sm:py-3 bg-black border border-white/20 text-[11px] sm:text-xs md:text-sm placeholder:text-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-2 mt-1">
                    <label className="text-[11px] sm:text-xs md:text-sm text-white/80 self-start mb-1">
                      Upload PDF Notes
                    </label>
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
                      <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-[#7a1bca]/30 border border-[#7a1bca]/60 uppercase tracking-[0.18em]">
                        AI MODE
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {["Lecture", "Notes", "Practice"].map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setContentType(mode)}
                          className={`px-3 py-1 rounded-full text-[11px] sm:text-xs transition-all duration-200 ${
                            contentType === mode
                              ? "bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                              : "bg-black border border-white/25 text-white/80 hover:border-white hover:text-white"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-white/60 mt-1">
                      GenQuiz uses AI to understand your {contentType.toLowerCase()} and turn them into topic-wise quizzes.
                    </p>
                  </div>

                  <div className="mt-1">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="w-full rounded-full px-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base font-bold bg-white text-black hover:bg-[#7a1bca] hover:text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(122,27,202,0.9)]"
                    >
                      Generate Quiz
                    </button>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-white/60 mt-2 text-center">
                      After clicking, you will be redirected to the MCQ page to start answering questions.
                    </p>
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
