import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily:
      "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    backgroundColor: "#f7f8fb",
    color: "#222",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRight: "1px solid #e6e9ef",
  },
  sidebarHeading: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 12,
    color: "#2c3e50",
  },
  sideNav: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 12,
  },
  categoryButton: (isSelected) => ({
    padding: "12px",
    textAlign: "left",
    backgroundColor: isSelected ? "#1f6feb" : "white",
    color: isSelected ? "white" : "#333",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: isSelected ? 700 : 500,
    transition: "all 0.12s ease",
  }),
  main: {
    flex: 1,
    padding: 36,
    maxWidth: "100%",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    width: "100%",
  },
  topThreeCols: {
    display: "flex",
    width: "100%",
    gap: 12,
    alignItems: "center",
  },
  topColLeft: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
  },
  topColCenter: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  topColRight: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  logoutButton: {
    padding: "10px 18px",
    backgroundColor: "#e65050",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: "#111827",
    letterSpacing: "-0.4px",
  },
  greeting: {
    fontSize: 16,
    fontWeight: 600,
    color: "#374151",
  },
  dashboardHeadingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 8,
  },
  createBtn: {
    padding: "10px 18px",
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
  smallMuted: {
    color: "#6b7280",
    marginBottom: 18,
  },
  createFormCard: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 26,
    border: "1px solid #e5e7eb",
  },
  formLabel: {
    display: "block",
    marginBottom: 6,
    fontWeight: 600,
    color: "#111827",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e6e9ef",
    marginBottom: 12,
    outline: "none",
    fontSize: 14,
  },
  textarea: {
    width: "100%",
    minHeight: 110,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e6e9ef",
    fontSize: 14,
    outline: "none",
  },
  submitBtn: {
    padding: "10px 18px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
  },
  questionsList: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  questionCard: (isHovered) => ({
    padding: 18,
    borderRadius: 10,
    border: "1px solid #e6e9ef",
    backgroundColor: "white",
    boxShadow: isHovered
      ? "0 8px 24px rgba(16,24,40,0.08)"
      : "0 1px 2px rgba(16,24,40,0.04)",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
    cursor: "pointer",
  }),
  metaRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginTop: 8,
    fontSize: 13,
    color: "#6b7280",
  },
};

function CategoryButton({ name, isSelected, onClick }) {
  return (
    <button onClick={onClick} style={styles.categoryButton(isSelected)}>
      {name}
    </button>
  );
}

function QuestionCard({ question, onOpen, isHovered, onEnter, onLeave }) {
  const answersCount = question.answers?.length || 0;
  const answered = !!question.answered;

  return (
    <div
      onClick={() => onOpen(question._id)}
      onMouseEnter={() => onEnter(question._id)}
      onMouseLeave={() => onLeave()}
      style={styles.questionCard(isHovered)}
    >
      <h3 style={{ margin: 0 }}>{question.title}</h3>
      <p style={{ color: "#4b5563", marginTop: 8 }}>{question.body}</p>

      <div style={styles.metaRow}>
        <div>
          {answered ? (
            <span style={{ color: "#059669", fontWeight: 700 }}>✓</span>
          ) : (
            <span style={{ color: "#dc2626", fontWeight: 700 }}>✗</span>
          )}{" "}
          <span style={{ marginLeft: 6, color: "#4b5563", fontWeight: 600 }}>
            {answered ? `${answersCount} answer(s)` : "Not answered yet"}
          </span>
        </div>
        <div style={{ marginLeft: "auto", color: "#9ca3af", fontWeight: 500 }}>
          {question.categoryName || question.category || ""}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [username, setUsername] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    body: "",
    category: "",
  });

  const [hoveredQuestionId, setHoveredQuestionId] = useState(null);

  useEffect(() => {
    try {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (err) {
      console.error("Error reading username from localStorage:", err);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch("http://localhost:5001/api/categories")
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch categories: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;

        const normalized = Array.isArray(data) ? data : [];
        setCategories(normalized);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch("http://localhost:5001/api/questions")
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch questions: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        const normalized = Array.isArray(data) ? data : [];
        setQuestions(normalized);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setQuestions([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("username");
    } catch (err) {
      console.warn("Could not remove username from localStorage:", err);
    }
    navigate("/login");
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();

    if (
      !newQuestion.title.trim() ||
      !newQuestion.body.trim() ||
      !newQuestion.category
    ) {
      alert("Please complete all fields (title, category, details).");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Failed to create question: ${response.status} ${text}`
        );
      }

      const updatedQuestions = await fetch(
        "http://localhost:5001/api/questions"
      ).then((res) => res.json());

      setQuestions(Array.isArray(updatedQuestions) ? updatedQuestions : []);

      setNewQuestion({ title: "", body: "", category: "" });
      setShowCreateForm(false);
    } catch (err) {
      console.error("Error creating question:", err);
      alert(
        "There was an issue creating your question. Check console for details."
      );
    }
  };

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => {
        const catId = q.category || q.categoryId;
        return catId === selectedCategory;
      })
    : questions;

  const handleCardEnter = (id) => {
    setHoveredQuestionId(id);
  };
  const handleCardLeave = () => {
    setHoveredQuestionId(null);
  };

  const openQuestion = (id) => {
    if (!id) return;

    navigate(`/questions/${id}`);
  };

  return (
    <div style={styles.page}>
      {/* Left Sidebar */}
      <aside style={styles.sidebar} aria-label="Categories Sidebar">
        <div style={styles.sidebarHeading}>Categories</div>

        <nav style={styles.sideNav} aria-label="Categories Navigation">
          {/* All Categories */}
          <CategoryButton
            name="All Categories"
            isSelected={!selectedCategory}
            onClick={() => setSelectedCategory(null)}
          />

          {/* Dynamically list categories */}
          {categories.length === 0 ? (
            <div style={{ color: "#9ca3af", marginTop: 6 }}>
              No categories yet
            </div>
          ) : (
            categories.map((cat) => (
              <CategoryButton
                key={cat._id || cat.id || cat.name}
                name={cat.name || "Unnamed"}
                isSelected={selectedCategory === (cat._id || cat.id)}
                onClick={() => setSelectedCategory(cat._id || cat.id)}
              />
            ))
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* TOP BAR: Logout (left), Title (center), Greeting (right)
            The title is intentionally placed between the Logout button and the greeting
            per your request: "add a header or title in between the logout button and
            the greeting on top of the page that says Instruments For Dummies"
        */}
        <div style={styles.topRow}>
          <div style={styles.topThreeCols}>
            {/* Left column: Logout button */}
            <div style={styles.topColLeft}>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </div>

            {/* Center column: THE TITLE - between Logout and Greeting */}
            <div style={styles.topColCenter}>
              <h1 style={styles.title}>🎵 Instruments For Dummies</h1>
            </div>

            {/* Right column: Greeting */}
            <div style={styles.topColRight}>
              {username ? (
                <div style={styles.greeting}>Hello, {username}!</div>
              ) : (
                <div style={{ color: "#9ca3af" }}>Not logged in</div>
              )}
            </div>
          </div>
        </div>

        {/* Secondary row: Dashboard heading + Create button */}
        <div style={styles.dashboardHeadingRow}>
          <h2 style={{ margin: 0 }}>Dashboard</h2>
          <button
            onClick={() => setShowCreateForm((s) => !s)}
            style={styles.createBtn}
          >
            {showCreateForm ? "Cancel" : "+ Create Question"}
          </button>
        </div>

        {/* Summary / status */}
        <p style={styles.smallMuted}>
          {selectedCategory
            ? `Showing ${filteredQuestions.length} question(s) in ${
                categories.find(
                  (c) => c._id === selectedCategory || c.id === selectedCategory
                )?.name || "selected category"
              }`
            : `Showing all ${questions.length} questions`}
        </p>

        {/* Create form */}
        {showCreateForm && (
          <section
            style={styles.createFormCard}
            aria-label="Create question form"
          >
            <h3 style={{ marginTop: 0 }}>Create New Question</h3>

            <form onSubmit={handleCreateQuestion}>
              <div style={{ marginBottom: 12 }}>
                <label style={styles.formLabel}>Title</label>
                <input
                  style={styles.input}
                  type="text"
                  value={newQuestion.title}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Short, descriptive question title"
                  required
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={styles.formLabel}>Category</label>
                <select
                  style={styles.input}
                  value={newQuestion.category}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option
                      key={cat._id || cat.id || cat.name}
                      value={cat._id || cat.id}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={styles.formLabel}>Question Details</label>
                <textarea
                  style={styles.textarea}
                  value={newQuestion.body}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }))
                  }
                  placeholder="Add more context, code snippets, or examples..."
                  required
                />
              </div>

              <div>
                <button type="submit" style={styles.submitBtn}>
                  Submit Question
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Questions list */}
        <section aria-label="Questions list" style={{ marginTop: 6 }}>
          <div style={styles.questionsList}>
            {filteredQuestions.length === 0 ? (
              <div style={{ color: "#9ca3af" }}>
                No questions in this category.
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <QuestionCard
                  key={question._id || question.id || question.title}
                  question={{
                    ...question,
                    categoryName:
                      categories.find(
                        (c) =>
                          c._id === question.category ||
                          c.id === question.category
                      )?.name ||
                      question.categoryName ||
                      "",
                  }}
                  onOpen={openQuestion}
                  isHovered={
                    hoveredQuestionId === (question._id || question.id)
                  }
                  onEnter={handleCardEnter}
                  onLeave={handleCardLeave}
                />
              ))
            )}
          </div>
        </section>

        {/* Extra spacer at bottom so things aren't cramped */}
        <div style={{ height: 60 }} />
      </main>
    </div>
  );
}
