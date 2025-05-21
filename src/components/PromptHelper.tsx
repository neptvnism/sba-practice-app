import { useState } from "react";

const promptText = `You're a clinical educator helping a student prepare for medical school board exams using SBA (Single Best Answer) format — similar to USMLE.

Based on the lecture content I will provide, please generate a clean and standardized list of SBA-style questions.

📝 Please follow this strict format for each question — no extra text before, between, or after:

Question [#]:
[Full question stem, ideally clinical vignette-style with relevant patient details and a clear "What is the best..." type ask.]

A. [option A]  
B. [option B]  
C. [option C]  
D. [option D]  
E. [option E]

⬇️ (Leave one empty line here)

Correct Answer: [One letter only: A, B, C, D, or E]  
Explanation: [Brief but specific explanation: why this option is correct + why the other 4 are incorrect]

✏️ Guidelines:
• Use clinical vignette style (e.g. patient age, gender, symptoms, labs)  
• Include a variety of question types: diagnosis, treatment, pathophysiology, prognosis, etc.  
• All 5 options must be plausible and unique  
• Make explanations individualized — no generic phrases  
• Do not include more than 5 options per question  
• Only include as many questions as I request

🧠 Now, generate [X] SBA-style questions from the following lecture:

“[INSERT FULL LECTURE TEXT HERE]”
`;

function PromptHelper() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        background: "#f7f7f7",
        padding: "1.5rem",
        borderRadius: "1rem",
        border: "1px solid #ccc",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>
        💬 Need a prompt? Use this to generate your own SBA set with ChatGPT!
      </h3>
      <button
        onClick={handleCopy}
        style={{
          padding: "0.5rem 1rem",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
      >
        {copied ? "✅ Copied!" : "Copy Prompt"}
      </button>
    </div>
  );
}

export default PromptHelper;
export {};
