import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5001/api/questions/${id}`)
      .then((res) => res.json())
      .then((data) => setQuestion(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  const handleSubmitAnswer = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/questions/${id}/answers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: answerText }),
        }
      );

      if (response.ok) {
        const updated = await fetch(
          `http://localhost:5001/api/questions/${id}`
        ).then((r) => r.json());
        setQuestion(updated);
        setAnswerText("");
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{question.title}</h1>
      <p style={{ color: "#555", fontSize: "16px", marginBottom: "30px" }}>
        {question.body}
      </p>

      <h2>Answers ({question.answers?.length || 0})</h2>

      {question.answers && question.answers.length > 0 ? (
        <div style={{ marginBottom: "30px" }}>
          {question.answers.map((answer, index) => (
            <div
              key={index}
              style={{
                padding: "15px",
                backgroundColor: "#f9f9f9",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            >
              <p>{answer.body}</p>
              <small style={{ color: "#666" }}>
                {new Date(answer.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#999" }}>No answers yet. Be the first to answer!</p>
      )}

      <h3>Add Your Answer</h3>
      <textarea
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Write your answer..."
        style={{
          width: "100%",
          minHeight: "100px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={handleSubmitAnswer}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit Answer
      </button>
    </div>
  );
}
