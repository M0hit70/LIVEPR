import React, { useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.jpg";
import textureImg from "../assets/texture.jpg";

const staticQuizData = [
  {
    topicId: "react",
    topic: "React Basics",
    questions: [
      {
        id: 1,
        text: "What is ReactJS primarily used for?",
        options: [
          "Server-side programming",
          "Building user interfaces",
          "Database management",
          "Data analysis",
        ],
        answer: "Building user interfaces",
      },
      {
        id: 2,
        text: "What hook is used for state management in a functional component?",
        options: ["useState()", "useEffect()", "useContext()", "useReducer()"],
        answer: "useState()",
      },
    ],
  },
  {
    topicId: "tailwind",
    topic: "Tailwind CSS",
    questions: [
      {
        id: 3,
        text: "Tailwind CSS is a type of what framework?",
        options: [
          "Component-based",
          "Utility-first",
          "Semantic",
          "Object-Oriented",
        ],
        answer: "Utility-first",
      },
      {
        id: 4,
        text: "Which class is used to set a flex container?",
        options: ["display-flex", "flexbox", "flex-container", "flex"],
        answer: "flex",
      },
    ],
  },
  {
    topicId: "es6",
    topic: "JavaScript ES6",
    questions: [
      {
        id: 5,
        text: "Which keyword is used for block-scoped variables?",
        options: ["var", "let", "const", "local"],
        answer: "let",
      },
      {
        id: 6,
        text: "What does the '...' spread operator do?",
        options: [
          "Concatenates strings",
          "Copies array or object values",
          "Performs multiplication",
          "Defines a rest parameter only",
        ],
        answer: "Copies array or object values",
      },
    ],
  },
  {
    topicId: "node",
    topic: "Node.js Basics",
    questions: [
      {
        id: 7,
        text: "Node.js is primarily used for what side of development?",
        options: [
          "Client-side",
          "Server-side",
          "Database-side",
          "Design-side",
        ],
        answer: "Server-side",
      },
      {
        id: 8,
        text: "Which runtime environment does Node.js use?",
        options: [
          "Java Virtual Machine",
          "Python Interpreter",
          "V8 JavaScript engine",
          "PHP Runtime",
        ],
        answer: "V8 JavaScript engine",
      },
    ],
  },
];

const QuizApp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const aiQuestions =
    location.state && location.state.questions && location.state.mode === "ai"
      ? location.state.questions
      : null;

  const baseQuizData = aiQuestions
    ? [
        {
          topicId: "ai",
          topic:
            location.state?.topicName ||
            location.state?.subject ||
            "AI Generated Quiz",
          questions: aiQuestions,
        },
      ]
    : staticQuizData;

  const allQuestions = baseQuizData.reduce((acc, topic) => {
    const mapped = topic.questions.map((q) => ({
      ...q,
      topicId: topic.topicId,
      topicName: topic.topic,
    }));
    return acc.concat(mapped);
  }, []);

  const totalQuestions = allQuestions.length;

  const questionMap = allQuestions.reduce((map, q) => {
    map[q.id] = q;
    return map;
  }, {});

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [lastChange, setLastChange] = useState(null);
  const [showProgressDetails, setShowProgressDetails] = useState(false);

  const currentQuestion =
    allQuestions[Math.min(currentQuestionIndex, totalQuestions - 1)];

  const selectedOption = userAnswers[currentQuestion.id] ?? null;
  const isAnswered = selectedOption !== null;
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === totalQuestions - 1;

  const topicScores = useMemo(() => {
    const scores = baseQuizData.reduce(
      (acc, topic) => ({
        ...acc,
        [topic.topicId]: {
          correct: 0,
          incorrect: 0,
          total: topic.questions.length,
        },
      }),
      {}
    );

    Object.keys(userAnswers).forEach((qId) => {
      const q = questionMap[qId];
      if (!q) return;
      const answer = userAnswers[qId];
      if (answer === q.answer) {
        scores[q.topicId].correct += 1;
      } else {
        scores[q.topicId].incorrect += 1;
      }
    });

    return baseQuizData.map((topic) => ({
      ...topic,
      correct: scores[topic.topicId].correct,
      incorrect: scores[topic.topicId].incorrect,
      total: scores[topic.topicId].total,
    }));
  }, [userAnswers, baseQuizData, questionMap]);

  const totalCorrect = useMemo(() => {
    return Object.keys(userAnswers).reduce((count, qId) => {
      const q = questionMap[qId];
      if (!q) return count;
      return userAnswers[qId] === q.answer ? count + 1 : count;
    }, 0);
  }, [userAnswers, questionMap]);

  const totalAnswered = Object.keys(userAnswers).length;
  const totalIncorrect = totalAnswered - totalCorrect;
  const totalNotAttempted = totalQuestions - totalAnswered;
  const percentage =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const overallCompletion =
    totalQuestions > 0
      ? Math.round((totalAnswered / totalQuestions) * 100)
      : 0;

  const handleOptionSelect = useCallback(
    (option) => {
      setUserAnswers((prev) => {
        const wasAnsweredBefore = prev[currentQuestion.id] !== undefined;
        const q = currentQuestion;
        const isCorrectNow = option === q.answer;

        const updated = {
          ...prev,
          [currentQuestion.id]: option,
        };

        if (!wasAnsweredBefore || prev[currentQuestion.id] !== option) {
          setLastChange({
            topicId: q.topicId,
            isCorrect: isCorrectNow,
          });
        }

        return updated;
      });
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (isLast) {
      setIsFinished(true);
      return;
    }
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  }, [isLast, totalQuestions]);

  const handlePrevious = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleTopicClick = useCallback((topicId) => {
    const firstIndex = allQuestions.findIndex((q) => q.topicId === topicId);
    if (firstIndex !== -1) {
      setCurrentQuestionIndex(firstIndex);
      setIsFinished(false);
    }
  }, [allQuestions]);

  const handleRestart = useCallback(() => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    setLastChange(null);
  }, []);

  const handleChangeAnswer = useCallback(() => {
    setUserAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion.id];
      return updated;
    });
    setLastChange(null);
  }, [currentQuestion.id]);

  const activeTopicName = currentQuestion.topicName;

  let performanceTitle = "Nice effort!";
  let performanceDetail =
    "You have a good base. Review the questions you missed and try again.";

  if (percentage >= 85) {
    performanceTitle = "Outstanding performance!";
    performanceDetail =
      "You’ve mastered this topic. Keep the momentum going with tougher quizzes.";
  } else if (percentage >= 70) {
    performanceTitle = "Great job!";
    performanceDetail =
      "You understand most of the concepts. A quick revision will make you perfect.";
  } else if (percentage >= 50) {
    performanceTitle = "Keep practicing!";
    performanceDetail =
      "You’re halfway there. Focus on the incorrect questions and try another round.";
  } else if (percentage > 0) {
    performanceTitle = "Good start!";
    performanceDetail =
      "Everyone starts somewhere. Revisit your notes and attempt the quiz again.";
  } else {
    performanceTitle = "Ready when you are!";
    performanceDetail =
      "Start answering questions to see how well you know this topic.";
  }

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
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseScore {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes bgGlow {
          0% { opacity: 0.4; transform: translate3d(-10px, 10px, 0) scale(1); }
          50% { opacity: 0.9; transform: translate3d(10px, -10px, 0) scale(1.05); }
          100% { opacity: 0.4; transform: translate3d(-10px, 10px, 0) scale(1); }
        }
        @keyframes completionSweep {
          0% { width: 0%; opacity: 0.4; }
          100% { width: 100%; opacity: 1; }
        }
        @keyframes answeredUp {
          0% { opacity: 0; transform: translateY(10px); color: #7a1bca; }
          100% { opacity: 1; transform: translateY(0); color: #ffffff; }
        }
        @keyframes cardFromTop {
          0% { opacity: 0; transform: translateY(-25px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cardFromBottom {
          0% { opacity: 0; transform: translateY(25px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .score-anim-down { animation: slideDown 0.2s ease-out; display: inline-block; }
        .score-anim-up { animation: slideUp 0.2s ease-out; display: inline-block; }
        .score-pulse { animation: pulseScore 0.25s ease-out; }
        .bg-glow { animation: bgGlow 10s ease-in-out infinite; }
        .answered-anim { animation: answeredUp 0.25s ease-out; display: inline-block; }
        .card-enter-top { animation: cardFromTop 0.6s ease-out; }
        .card-enter-bottom { animation: cardFromBottom 0.6s ease-out; }
        .option-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: translateX(-130%);
          transition: transform 0.45s ease-out;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .option-btn:hover::before {
          transform: translateX(130%);
        }
        .panel-scroll {
          scrollbar-width: thin;
          scrollbar-color: #a855f7 #05000b;
        }
        .panel-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .panel-scroll::-webkit-scrollbar-track {
          background: #05000b;
          border-radius: 999px;
        }
        .panel-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7, #7c3aed);
          border-radius: 999px;
        }
        .panel-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #c4b5fd, #a855f7);
        }
      `}</style>

      <div
        className="h-screen w-screen bg-black bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/85" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -inset-32 bg-gradient-to-tr from-[#7a1bca]/40 via-transparent to-[#4e0f9c]/60 blur-3xl opacity-70 bg-glow" />
          <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[60%] h-40 bg-gradient-to-t from-[#7a1bca]/40 via-transparent to-transparent blur-3xl opacity-70" />
        </div>

        <div className="relative h-full w-full p-2 sm:p-4 flex items-center justify-center">
          <div className="flex flex-row gap-3 sm:gap-4 w-full max-w-7xl h-[88vh]">
            <div className="w-[37%] min-w-[260px] h-full">
              <div className="h-full rounded-3xl p-[2px] bg-gradient-to-br from-[#7a1bca] via-[#4e0f9c] to-[#7a1bca] shadow-[0_0_35px_rgba(0,0,0,0.9)] card-enter-top">
                <div className="h-full p-3 sm:p-4 rounded-3xl bg-[#070014]/85 border border-white/10 backdrop-blur-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => navigate("/")}
                          className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#7a1bca] to-[#4e0f9c] flex items-center justify-center text-white text-sm font-extrabold tracking-[0.2em] shadow-[0_0_16px_rgba(122,27,202,0.9)] hover:scale-105 transition"
                        >
                          QZ
                        </button>
                        <div>
                          <div className="text-[10px] text-white/60 uppercase tracking-[0.24em]">
                            Player
                          </div>
                          <div className="text-xs text-white font-semibold">
                            Guest Learner
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-white/60 uppercase tracking-[0.24em]">
                          Streak
                        </div>
                        <div className="text-xs text-white font-semibold">
                          {totalCorrect} correct
                        </div>
                      </div>
                    </div>

                    <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-3 text-center tracking-wide">
                      <span className="text-white/60 text-[9px] sm:text-[10px] block mb-0.5 uppercase tracking-[0.24em]">
                        Quiz Dashboard
                      </span>
                      <span className="bg-gradient-to-r from-white via-[#e9d5ff] to-white bg-clip-text text-transparent">
                        Topics Overview
                      </span>
                    </h2>
                  </div>

                  <div className="flex-1 flex flex-col mb-2 overflow-hidden">
                    <div className="panel-scroll space-y-2.5 sm:space-y-3 pr-1 pl-1 pt-1 overflow-y-auto">
                      {topicScores.map((topic) => {
                        const answered = topic.correct + topic.incorrect;
                        const completion =
                          topic.total > 0
                            ? Math.round((answered / topic.total) * 100)
                            : 0;

                        const highlightCorrect =
                          lastChange?.topicId === topic.topicId &&
                          lastChange?.isCorrect;
                        const highlightIncorrect =
                          lastChange?.topicId === topic.topicId &&
                          lastChange?.isCorrect === false;

                        return (
                          <button
                            key={topic.topicId}
                            type="button"
                            onClick={() => handleTopicClick(topic.topicId)}
                            className={`w-full p-2.5 rounded-2xl flex flex-col gap-1.5 text-left transition-all duration-300 ease-out ${
                              topic.topic === activeTopicName
                                ? "bg-[#070014] border border-white shadow-[0_0_18px_rgba(122,27,202,0.9)] ring-1 ring-[#7a1bca]"
                                : "bg-[#140026] border border-black/60 shadow-md"
                            } hover:bg-[#1b0538] hover:border-white hover:shadow-[0_0_22px_rgba(122,27,202,1)] hover:-translate-y-[2px]`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm text-white font-semibold tracking-wide">
                                {topic.topic}
                              </span>
                              <div className="flex space-x-2 flex-shrink-0">
                                <div className="flex items-center gap-1">
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#22c55e] to-[#15803d] flex items-center justify-center text-[9px] font-extrabold text-black shadow-[0_0_6px_rgba(34,197,94,0.7)]">
                                    ✓
                                  </div>
                                  <span
                                    className={`text-[10px] sm:text-xs font-extrabold ${
                                      highlightCorrect
                                        ? "text-[#22c55e] score-pulse"
                                        : "text-white"
                                    }`}
                                  >
                                    <span
                                      className="score-anim-down"
                                      key={`${topic.topicId}-correct-${topic.correct}`}
                                    >
                                      {topic.correct}
                                    </span>
                                  </span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ef4444] to-[#b91c1c] flex items-center justify-center text-[9px] font-extrabold text-black shadow-[0_0_6px_rgba(239,68,68,0.7)]">
                                    ✕
                                  </div>
                                  <span
                                    className={`text-[10px] sm:text-xs font-extrabold ${
                                      highlightIncorrect
                                        ? "text-[#ef4444] score-pulse"
                                        : "text-white"
                                    }`}
                                  >
                                    <span
                                      className="score-anim-up"
                                      key={`${topic.topicId}-incorrect-${topic.incorrect}`}
                                    >
                                      {topic.incorrect}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[9px] sm:text-[10px] text-white">
                                <span>Completed</span>
                                <span>{completion}%</span>
                              </div>
                              <div className="w-full h-1 bg-black rounded-full overflow-hidden mt-1">
                                <div
                                  className="h-full bg-white transition-all duration-300"
                                  style={{ width: `${completion}%` }}
                                />
                              </div>
                            </div>
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => setShowProgressDetails(true)}
                        className="w-full text-left p-2.5 rounded-2xl bg-black/80 border border-white/20 flex flex-col gap-1.5 transition-all duration-300 ease-out hover:bg-[#7a1bca] hover:border-white hover:shadow-[0_0_22px_rgba(122,27,202,1)] hover:-translate-y-[2px]"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-white font-semibold tracking-wide">
                            Overall Progress
                          </span>
                          <span className="text-[11px] sm:text-xs text-white font-bold">
                            {overallCompletion}%
                          </span>
                        </div>
                        <div>
                          <div className="flex justify-between text-[9px] sm:text-[10px] text-white/80">
                            <span>
                              {totalAnswered}/{totalQuestions} answered
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[#4e0f9c] rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full bg-white transition-all duration-300"
                              style={{ width: `${overallCompletion}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-white/70 mt-0.5">
                          Click for topic-wise breakdown
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="p-2.5 rounded-2xl bg-black text-white text-center shadow-md">
                      <div className="text-[10px] sm:text-xs mb-0.5">
                        Total Questions
                      </div>
                      <div className="text-sm sm:text-base font-bold">
                        {totalQuestions}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-black text-white text-center shadow-md">
                      <div className="text-[10px] sm:text-xs mb-0.5">
                        Answered
                      </div>
                      <div className="text-sm sm:text-base font-bold">
                        <span
                          key={`answered-${totalAnswered}`}
                          className="answered-anim"
                        >
                          {totalAnswered}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 h-full">
              <div className="h-full rounded-3xl p-[2px] bg-gradient-to-br from-[#7a1bca] via-[#4e0f9c] to-[#7a1bca] shadow-[0_0_40px_rgba(0,0,0,1)] card-enter-bottom">
                <div className="relative h-full p-3 sm:p-5 rounded-3xl bg-gradient-to-br from-[#4e0f9c]/70 via-[#070014] to-[#7a1bca]/80 border border-white/10 flex flex-col backdrop-blur-xl overflow-hidden">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
                    style={{
                      backgroundImage: `url(${textureImg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="relative flex flex-col h-full">
                    {!isFinished ? (
                      <>
                        <ProgressBar
                          currentIndex={currentQuestionIndex}
                          total={totalQuestions}
                        />

                        <div className="flex justify-center mb-1">
                          <div className="px-3 py-1 rounded-full bg-black/90 text-white text-[10px] sm:text-xs tracking-wide border border-white/10">
                            {currentQuestion.topicName}
                          </div>
                        </div>

                        <h3 className="text-sm sm:text-xl md:text-2xl font-semibold mb-1 mt-1 text-center tracking-wide bg-gradient-to-r from-white via-[#e9d5ff] to-white bg-clip-text text-transparent">
                          {currentQuestion.text}
                        </h3>

                        <div className="flex justify-center mb-3">
                          <div className="w-24 sm:w-32 h-0.5 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-80" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div className="space-y-2.5 sm:space-y-3 mb-3 flex-1 flex flex-col justify-center">
                            {currentQuestion.options.map((option, index) => {
                              const isSelected = selectedOption === option;
                              const base =
                                "option-btn w-full rounded-2xl text-left text-sm sm:text-base md:text-lg font-semibold tracking-wide transition-all duration-200 ease-out relative overflow-hidden";
                              const stateClass = isSelected
                                ? "bg-gradient-to-r from-[#111827] via-black to-[#111827] text-white border border-[#d8b4fe]"
                                : "bg-[#140025] text-white border border-black/60";
                              const hover =
                                "hover:bg-gradient-to-r hover:from-[#7a1bca] hover:to-[#4e0f9c] hover:border-white hover:shadow-[0_0_18px_rgba(122,27,202,0.9)] hover:-translate-y-[2px]";

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  disabled={isAnswered}
                                  onClick={() => handleOptionSelect(option)}
                                  className={`${base} ${stateClass} ${
                                    isAnswered ? "cursor-default" : hover
                                  } px-4 sm:px-5 py-3 sm:py-4 md:py-4`}
                                >
                                  <span className="text-xs sm:text-sm mr-3 sm:mr-4 font-extrabold text-white">
                                    {String.fromCharCode(65 + index)}:
                                  </span>
                                  {option}
                                </button>
                              );
                            })}
                          </div>

                          <div className="min-h-[80px] flex flex-col items-center justify-center gap-2 mb-3">
                            {isAnswered ? (
                              <>
                                <div className="max-w-md w-full mx-auto rounded-2xl text-center font-semibold text-xs sm:text-sm md:text-base px-4 py-3 shadow-md bg-black/90 border border-white/15 text-white">
                                  <div className="flex items-center justify-center gap-3 mb-1">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shadow-[0_0_10px_rgba(0,0,0,0.8)] ${
                                        selectedOption ===
                                        currentQuestion.answer
                                          ? "bg-gradient-to-br from-[#22c55e] to-[#15803d] text-black"
                                          : "bg-gradient-to-br from-[#ef4444] to-[#b91c1c] text-black"
                                      }`}
                                    >
                                      {selectedOption ===
                                      currentQuestion.answer
                                        ? "✓"
                                        : "✕"}
                                    </div>
                                    <span>
                                      {selectedOption ===
                                      currentQuestion.answer
                                        ? "Correct answer!"
                                        : "Incorrect. Try to recall the core concept."}
                                    </span>
                                  </div>
                                  <div className="text-[10px] sm:text-xs text-white/70">
                                    {selectedOption === currentQuestion.answer
                                      ? "Well done. This concept looks solid for you."
                                      : "Review your notes on this topic and compare the options carefully."}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={handleChangeAnswer}
                                  className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-black text-white border border-white/20 hover:bg-[#7a1bca] hover:border-white hover:text-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_0_16px_rgba(122,27,202,0.8)]"
                                >
                                  Change answer
                                </button>
                              </>
                            ) : (
                              <div className="text-[11px] sm:text-xs text-white/70 text-center max-w-md">
                                Choose an option above to check your answer and update your topic stats on the left in real time.
                              </div>
                            )}
                          </div>

                          <div className="mt-1 flex justify-between gap-3">
                            <button
                              type="button"
                              onClick={handlePrevious}
                              disabled={isFirst}
                              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold tracking-wide ${
                                isFirst
                                  ? "bg-black text-white/40 cursor-not-allowed"
                                  : "bg-gradient-to-r from-black to-black text-white hover:from-[#4b5563] hover:to-black"
                              } transition-all duration-200 ease-out ${
                                !isFirst
                                  ? "hover:-translate-y-[1px] hover:shadow-[0_0_16px_rgba(107,114,128,0.9)]"
                                  : ""
                              }`}
                            >
                              {"<<"} Prev
                            </button>

                            <button
                              type="button"
                              onClick={handleNext}
                              disabled={!isAnswered}
                              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold tracking-wide ${
                                !isAnswered
                                  ? "bg-black text-white/40 cursor-not-allowed"
                                  : "bg-gradient-to-r from-[#a855f7] to-[#4e0f9c] text-white hover:shadow-[0_0_20px_rgba(122,27,202,0.9)]"
                              } transition-all duration-200 ease-out ${
                                isAnswered
                                  ? "hover:-translate-y-[1px]"
                                  : ""
                              }`}
                            >
                              {isLast ? "Finish quiz" : "Next >>"}
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center flex-1">
                        <div className="w-full max-w-md mb-4">
                          <div className="h-2 rounded-full bg-black overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#7a1bca] via-white to-[#7a1bca] completionSweep" />
                          </div>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-wide">
                          Quiz completed
                        </h2>

                        <p className="text-sm sm:text-lg text-white mb-1 tracking-wide">
                          Score:{" "}
                          <span className="font-extrabold">
                            {totalCorrect}
                          </span>{" "}
                          /{" "}
                          <span className="font-semibold">
                            {totalQuestions}
                          </span>{" "}
                          ({percentage}%)
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-[11px] sm:text-sm text-white/90 mb-4">
                          <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10">
                            ✅ Correct:{" "}
                            <span className="font-bold text-[#22c55e]">
                              {totalCorrect}
                            </span>
                          </span>
                          <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10">
                            ❌ Incorrect:{" "}
                            <span className="font-bold text-[#ef4444]">
                              {totalIncorrect}
                            </span>
                          </span>
                          <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10">
                            ⏳ Not attempted:{" "}
                            <span className="font-bold text-white">
                              {totalNotAttempted}
                            </span>
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1">
                          {performanceTitle}
                        </h3>
                        <p className="text-[11px] sm:text-xs md:text-sm text-white/80 mb-5 max-w-md leading-relaxed">
                          {performanceDetail}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                          <button
                            type="button"
                            onClick={handleRestart}
                            className="px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold bg-gradient-to-r from-black to-black text-white border border-white/20 hover:border-white hover:from-[#4b5563] hover:to-black transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_0_18px_rgba(107,114,128,0.9)]"
                          >
                            Restart quiz
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold bg-gradient-to-r from-[#a855f7] to-[#4e0f9c] text-white hover:shadow-[0_0_20px_rgba(122,27,202,0.9)] transition-all duration-200 hover:-translate-y-[1px]"
                          >
                            Back to home
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate("/auth")}
                            className="px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold bg-white text-black hover:bg-gradient-to-r hover:from-[#a855f7] hover:to-[#4e0f9c] hover:text-white hover:shadow-[0_0_20px_rgba(122,27,202,0.9)] transition-all duration-200 hover:-translate-y-[1px]"
                          >
                            Create account to save progress
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showProgressDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowProgressDetails(false)}
            />
            <div className="relative z-10 w-full max-w-md">
              <div className="rounded-3xl p-[2px] bg-gradient-to-br from-[#b794ff] via-[#7a1bca] to-[#4e0f9c] shadow-[0_0_28px_rgba(0,0,0,1)]">
                <div className="rounded-3xl bg-black/85 backdrop-blur-xl p-4 sm:5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                      Topic-wise progress
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowProgressDetails(false)}
                      className="px-3 py-1.5 rounded-full text-xs sm:text-sm bg-black/90 text-white border border-white/60 hover:bg-[#7a1bca] hover:text-white hover:border-white shadow-sm hover:shadow-[0_0_16px_rgba(122,27,202,0.9)] transition-all duration-200"
                    >
                      Close
                    </button>
                  </div>
                  <div className="panel-scroll space-y-3 max-h-72 overflow-y-auto pr-1">
                    {topicScores.map((topic) => {
                      const attempted = topic.correct + topic.incorrect;
                      const notAttempted = topic.total - attempted;
                      const completion =
                        topic.total > 0
                          ? Math.round((attempted / topic.total) * 100)
                          : 0;

                      return (
                        <div
                          key={topic.topicId}
                          className="p-3 rounded-2xl bg-black/80 border border-white/10 text-white text-xs sm:text-sm transition-all duration-200 hover:border-white hover:shadow-[0_0_18px_rgba(122,27,202,0.8)]"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-sm sm:text-base">
                              {topic.topic}
                            </span>
                            <span className="text-[11px] sm:text-xs">
                              {completion}% done
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[#4e0f9c] rounded-full overflow-hidden mb-2">
                            <div
                              className="h-full bg-white transition-all duration-300"
                              style={{ width: `${completion}%` }}
                            />
                          </div>
                          <div className="flex justify-between flex-wrap gap-y-1">
                            <span>Questions: {topic.total}</span>
                            <span>Attempted: {attempted}</span>
                            <span className="text-[#22c55e]">
                              Correct: {topic.correct}
                            </span>
                            <span className="text-[#ef4444]">
                              Incorrect: {topic.incorrect}
                            </span>
                            <span>Not attempted: {notAttempted}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ProgressBar = ({ currentIndex, total }) => {
  const percent = ((currentIndex + 1) / total) * 100;

  return (
    <div className="w-full mb-2 sm:mb-3">
      <div className="flex justify-between text-[10px] sm:text-xs text-white mb-1 tracking-wide">
        <span className="font-semibold bg-gradient-to-r from-white via-[#e9d5ff] to-white bg-clip-text text-transparent">
          Progress
        </span>
        <span>
          {currentIndex + 1}/{total}
        </span>
      </div>
      <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
        <div
          className="h-full bg-[#7a1bca] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default QuizApp;
