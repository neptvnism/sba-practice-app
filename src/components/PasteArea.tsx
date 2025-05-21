import { useState } from "react";
import Settings from "./Settings";
import Quiz from "./Quiz";

type PasteAreaProps = {
  setQuizStarted: (val: boolean) => void;
};

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

function PasteArea({ setQuizStarted }: PasteAreaProps) {
  const [text, setText] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Settings state
  const [timeMode, setTimeMode] = useState<"standard" | "fast" | "custom">("standard");
  const [customMin, setCustomMin] = useState(1);
  const [customSec, setCustomSec] = useState(30);
  const [answerReveal, setAnswerReveal] = useState<"perQuestion" | "afterAll">("afterAll");

  const handleSubmit = () => {
    const parsed = parseQuestions(text);
    if (parsed.length === 0) {
      alert("Couldn't parse any questions. Check the format and try again.");
      return;
    }
    setQuestions(parsed);
    setQuizStarted(true);
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  const parseQuestions = (input: string): Question[] => {
    const blocks = input
      .split(/Question\s+\d+:/i)
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const result: Question[] = [];

    for (const block of blocks) {
      const questionMatch = block.match(/^(.*?)\nA\./s);
      if (!questionMatch) continue;

      const questionText = questionMatch[1].trim();

      const optionMatches = [...block.matchAll(/[A-E]\.\s*(.*?)(?=\n[A-E]\.|(?=\n?Correct Answer))/gs)];
      if (optionMatches.length !== 5) continue;

      const options = optionMatches.map((m) => m[1].trim());

      const correctMatch = block.match(/Correct Answer:\s*([A-E])/i);
      const explanationMatch = block.match(/Explanation:\s*(.*)/s);

      if (!correctMatch || !explanationMatch) continue;

      result.push({
        question: questionText,
        options,
        correctAnswer: correctMatch[1].toUpperCase(),
        explanation: explanationMatch[1].trim(),
      });
    }

    return result;
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {questions.length === 0 ? (
        <>
          <h2>Paste Your SBA Questions</h2>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your questions here..."
            rows={10}
            style={{
              width: "100%",
              fontSize: "1rem",
              padding: "1rem",
              borderRadius: "0.75rem",
              border: "1px solid #ccc",
              resize: "vertical",
              fontFamily:
                "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
            }}
          />

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              onClick={handleSubmit}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#333",
                color: "#fff",
                border: "none",
                borderRadius: "1rem",
                cursor: "pointer",
                fontFamily:
                  "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
                fontSize: "1rem",
              }}
            >
              🚀 Submit
            </button>

            <button
              onClick={handleSettings}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#f0f0f0",
                color: "#333",
                border: "1px solid #ccc",
                borderRadius: "1rem",
                cursor: "pointer",
                fontFamily:
                  "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
                fontSize: "1rem",
              }}
            >
              ⚙️ Settings
            </button>
          </div>

          {/* Settings summary */}
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.95rem",
              color: "#666",
              fontFamily:
                "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
            }}
          >
            ⏱ Timer: {timeMode === "standard" ? "1.5 min" : timeMode === "fast" ? "1.2 min" : `${customMin}m ${customSec}s`} | ✅ Reveal: {answerReveal === "perQuestion" ? "after each question" : "after full quiz"}
          </p>

          {/* Settings panel */}
          {showSettings && (
            <Settings
              onClose={() => setShowSettings(false)}
              timeMode={timeMode}
              setTimeMode={setTimeMode}
              customMin={customMin}
              setCustomMin={setCustomMin}
              customSec={customSec}
              setCustomSec={setCustomSec}
              answerReveal={answerReveal}
              setAnswerReveal={setAnswerReveal}
            />
          )}
        </>
      ) : (
        <Quiz
          questions={questions}
          answerReveal={answerReveal}
          timerMode={timeMode}
          customMin={customMin}
          customSec={customSec}
        />
      )}
    </div>
  );
}

export default PasteArea;
