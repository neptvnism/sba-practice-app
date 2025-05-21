import { useState } from "react";
import PasteArea from "./components/PasteArea";
import PromptHelper from "./components/PromptHelper";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div
      style={{
        maxWidth: "800px",
        width: "100%",
        background: "#fff",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 0 12px rgba(0,0,0,0.05)",
        fontFamily:
          "'Arial Rounded MT', 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>SBA Practice App</h1>
      <PasteArea setQuizStarted={setQuizStarted} />
      {!quizStarted && <PromptHelper />}
    </div>
  );
}

export default App;
