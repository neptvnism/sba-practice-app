import { useState, useEffect } from "react";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type QuizProps = {
  questions: Question[];
  answerReveal: "perQuestion" | "afterAll";
  timerMode?: "standard" | "fast" | "custom";
  customMin?: number;
  customSec?: number;
};

function Quiz({ questions, answerReveal, timerMode = "standard", customMin = 1, customSec = 30 }: QuizProps) {
  const [selected, setSelected] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [isCorrect, setIsCorrect] = useState<(boolean | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  // Calculate time per question
  const getTimePerQuestion = () => {
    switch (timerMode) {
      case "fast":
        return 72; // 1.2 minutes = 72 seconds
      case "custom":
        return customMin * 60 + customSec;
      case "standard":
      default:
        return 90;
    }
  };

  const [timeLeft, setTimeLeft] = useState(getTimePerQuestion() * questions.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleScoreSummary();
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelect = (qIndex: number, optionIndex: number) => {
    const updated = [...selected];
    updated[qIndex] = optionIndex;
    setSelected(updated);
  };

  const handleSubmit = (qIndex: number) => {
    const selectedIndex = selected[qIndex];
    if (selectedIndex === null) return;
    const correctIndex = questions[qIndex].correctAnswer.charCodeAt(0) - 65;
    const updated = [...isCorrect];
    updated[qIndex] = selectedIndex === correctIndex;
    setIsCorrect(updated);
  };

  const handleRevealAll = () => {
    setShowAnswerKey(true);
  };

  const handleScoreSummary = () => {
    const results = questions.map((q, i) => {
      const selectedIndex = selected[i];
      const correctIndex = q.correctAnswer.charCodeAt(0) - 65;
      return selectedIndex !== null && selectedIndex === correctIndex;
    });
    setIsCorrect(results);
    setShowScore(true);
  };

  const totalCorrect = isCorrect.filter((val) => val === true).length;

  return (
    <div>
      <div
        style={{
          textAlign: "right",
          marginBottom: "1rem",
          fontSize: "1rem",
          color: timeLeft <= 10 ? "red" : "#333",
          fontWeight: "bold",
        }}
      >
        ⏱️ Time left: {formatTime(timeLeft)}
      </div>

      {questions.map((q, qIndex) => {
        const correctIndex = q.correctAnswer.charCodeAt(0) - 65;

        return (
          <div key={qIndex} style={{ marginBottom: "2rem" }}>
            <h3>
              🧪 Question {qIndex + 1} of {questions.length}
            </h3>
            <p style={{ fontWeight: "bold" }}>{q.question}</p>

            <ul style={{ listStyleType: "none", padding: 0, marginBottom: "1rem" }}>
              {q.options.map((option, index) => {
                const isSelected = selected[qIndex] === index;
                const isCorrectOption = index === correctIndex;

                return (
                  <li
                    key={index}
                    onClick={() => handleSelect(qIndex, index)}
                    style={{
                      marginBottom: "0.5rem",
                      padding: "0.75rem 1rem",
                      background:
                        showAnswerKey && isCorrectOption
                          ? "#d4edda"
                          : isSelected
                          ? "#d0ebff"
                          : "#f0f0f0",
                      borderRadius: "0.75rem",
                      cursor: "pointer",
                      fontFamily:
                        "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
                    }}
                  >
                    <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                  </li>
                );
              })}
            </ul>

            {answerReveal === "perQuestion" &&
              selected[qIndex] !== null &&
              isCorrect[qIndex] === null && (
                <button
                  onClick={() => handleSubmit(qIndex)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#e0e0e0",
                    color: "#000",
                    border: "none",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    fontFamily:
                      "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
                  }}
                >
                  ✅ Submit Answer
                </button>
              )}

            {isCorrect[qIndex] !== null && (answerReveal === "perQuestion" || showScore) && (
              <>
                <p
                  style={{
                    marginTop: "1rem",
                    fontWeight: "bold",
                    color: isCorrect[qIndex] ? "green" : "red",
                    fontFamily:
                      "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
                  }}
                >
                  {isCorrect[qIndex] ? "✅ Correct!" : "❌ Incorrect!"}
                </p>

                <p
                  style={{
                    marginTop: "0.5rem",
                    fontStyle: "italic",
                    color: "#555",
                    fontFamily:
                      "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
                  }}
                >
                  {"💡 " + q.explanation}
                </p>
              </>
            )}
          </div>
        );
      })}

      {/* Answer Key + Score Buttons */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={handleRevealAll}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#e0e0e0",
            color: "#000",
            border: "none",
            borderRadius: "0.75rem",
            cursor: "pointer",
            fontSize: "1rem",
            fontFamily:
              "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
            marginRight: "1rem",
          }}
        >
          🟩 Show Answer Key
        </button>

        <button
          onClick={handleScoreSummary}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "0.75rem",
            cursor: "pointer",
            fontSize: "1rem",
            fontFamily:
              "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
          }}
        >
          📊 {answerReveal === "perQuestion" ? "Show Score Summary" : "Submit Quiz & Show Score"}
        </button>
      </div>

      {showScore && (
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontWeight: "bold",
            fontSize: "1.25rem",
            color: "#333",
            fontFamily:
              "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
          }}
        >
          🧮 You scored {totalCorrect} out of {questions.length}!
        </div>
      )}

      {timerExpired && (
        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "red",
          }}
        >
          ⌛ Time's up! Quiz auto-submitted.
        </div>
      )}
    </div>
  );
}

export default Quiz;
