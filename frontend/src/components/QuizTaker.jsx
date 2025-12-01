// frontend/src/components/QuizTaker.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function QuizTaker() {
  const [quizzes, setQuizzes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [scoring, setScoring] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  async function fetchQuizzes() {
    try {
      const resp = await API.get("/quizzes");
      setQuizzes(resp.data.quizzes || []);
    } catch (err) {
      alert("Could not load quizzes. Check backend GET /api/quizzes");
      console.error(err);
    }
    setLoading(false);
  }

  function setAns(qIndex, value) {
    setAnswers({ ...answers, [qIndex]: value });
  }

  async function submitQuiz() {
    if (!selected) return;

    const answersArray = Object.keys(answers).map((k) => ({
      index: Number(k),
      answer: answers[k],
    }));

    try {
      setScoring(true);
      const resp = await API.post("/quizzes/score", {
        userId: "demo-user-id",
        quizId: selected._id,
        answers: answersArray,
      });

      alert(
        `Score: ${Math.round(resp.data.score * 100)}%  (${resp.data.correct}/${resp.data.total})`
      );

      fetchQuizzes();
      setSelected(null);
      setAnswers({});
    } catch (err) {
      alert("Scoring failed. Check backend POST /api/quizzes/score");
      console.error(err);
    }
    setScoring(false);
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Quizzes</h2>

        <div style={{ display: "flex", gap: 20 }}>
          {/* LEFT SIDE — Quiz List */}
          <div style={{ width: "40%" }}>
            <h3>Available quizzes</h3>

            {loading ? (
              <div>Loading...</div>
            ) : quizzes.length === 0 ? (
              <div className="small">No quizzes yet. Create one in Planner.</div>
            ) : (
              <ul>
                {quizzes.map((q) => (
                  <li key={q._id} style={{ marginBottom: 10 }}>
                    <button
                      className="secondary"
                      onClick={() => setSelected(q)}
                      style={{ width: "100%" }}
                    >
                      {q.subject} — {new Date(q.createdAt).toLocaleString()}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RIGHT SIDE — Quiz Detail */}
          <div style={{ width: "60%" }}>
            {!selected ? (
              <div className="small">Select a quiz to take it.</div>
            ) : (
              <>
                <h3>{selected.subject} Quiz</h3>

                {selected.questions.map((q, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <strong>{i + 1}.</strong> {q.question}
                    {q.options ? (
                      q.options.map((opt) => (
                        <div key={opt}>
                          <label>
                            <input
                              type="radio"
                              name={`q${i}`}
                              onChange={() => setAns(i, opt)}
                            />
                            {" "}{opt}
                          </label>
                        </div>
                      ))
                    ) : (
                      <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(e) => setAns(i, e.target.value)}
                      />
                    )}
                  </div>
                ))}

                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <button onClick={submitQuiz}>
                    {scoring ? "Scoring..." : "Submit Quiz"}
                  </button>
                  <button
                    className="secondary"
                    onClick={() => {
                      setSelected(null);
                      setAnswers({});
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
