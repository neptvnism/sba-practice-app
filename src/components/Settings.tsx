type SettingsProps = {
  onClose: () => void;
  timeMode: "standard" | "fast" | "custom";
  setTimeMode: (val: "standard" | "fast" | "custom") => void;
  customMin: number;
  setCustomMin: (val: number) => void;
  customSec: number;
  setCustomSec: (val: number) => void;
  answerReveal: "perQuestion" | "afterAll";
  setAnswerReveal: (val: "perQuestion" | "afterAll") => void;
};

function Settings({
  onClose,
  timeMode,
  setTimeMode,
  customMin,
  setCustomMin,
  customSec,
  setCustomSec,
  answerReveal,
  setAnswerReveal,
}: SettingsProps) {
  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        borderRadius: "1rem",
        border: "1px solid #ccc",
        background: "#f9f9f9",
        fontFamily:
          "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>⚙️ Optimize Your Quiz</h3>

      {/* Timer settings */}
      <div style={{ marginBottom: "1rem" }}>
        <p>
          <strong>⏱ Timer per question:</strong>
        </p>
        <label>
          <input
            type="radio"
            name="timer"
            value="standard"
            checked={timeMode === "standard"}
            onChange={() => setTimeMode("standard")}
          />{" "}
          1.5 min (Standard)
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="timer"
            value="fast"
            checked={timeMode === "fast"}
            onChange={() => setTimeMode("fast")}
          />{" "}
          1.2 min (Fast)
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="timer"
            value="custom"
            checked={timeMode === "custom"}
            onChange={() => setTimeMode("custom")}
          />{" "}
          Custom:{" "}
          <input
            type="number"
            value={customMin}
            onChange={(e) => setCustomMin(Number(e.target.value))}
            style={{ width: "50px", marginLeft: "0.5rem" }}
          />
          min{" "}
          <input
            type="number"
            value={customSec}
            onChange={(e) => setCustomSec(Number(e.target.value))}
            style={{ width: "50px" }}
          />
          sec
        </label>
      </div>

      {/* Answer reveal settings */}
      <div style={{ marginBottom: "1rem" }}>
        <p>
          <strong>✅ Show answers:</strong>
        </p>
        <label>
          <input
            type="radio"
            name="answers"
            value="afterAll"
            checked={answerReveal === "afterAll"}
            onChange={() => setAnswerReveal("afterAll")}
          />{" "}
          After whole quiz
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="answers"
            value="perQuestion"
            checked={answerReveal === "perQuestion"}
            onChange={() => setAnswerReveal("perQuestion")}
          />{" "}
          After each question
        </label>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "0.75rem",
          cursor: "pointer",
          fontFamily:
            "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
        }}
      >
        ✅ Done
      </button>
    </div>
  );
}

export default Settings;
