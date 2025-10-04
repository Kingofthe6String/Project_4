import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import "../../styles.css";

function CategoryButton({ name, isSelected, onClick }) {
  return (
    <button
      type="button"
      className={`category-btn ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

function QuestionCard({ question, onOpen, isHovered, onEnter, onLeave }) {
  const answersCount = question.answers?.length || 0;
  const answered = !!question.answered;

  return (
    <article
      className={`question-card ${isHovered ? "hovered" : ""}`}
      onClick={() => onOpen(question._id || question.id)}
      onMouseEnter={() => onEnter(question._id || question.id)}
      onMouseLeave={onLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen(question._id || question.id);
      }}
    >
      <h3 style={{ margin: 0 }}>{question.title}</h3>
      <p className="question-body" style={{ marginTop: 8, color: "#4b5563" }}>
        {question.body}
      </p>
      <div className="meta-row" aria-hidden>
        <div>
          {answered ? (
            <span style={{ color: "#059669", fontWeight: 700 }}>✓</span>
          ) : (
            <span style={{ color: "#dc2626", fontWeight: 700 }}>✗</span>
          )}
          <span style={{ marginLeft: 8, color: "#4b5563", fontWeight: 600 }}>
            {answered ? `${answersCount} answer(s)` : "Not answered yet"}
          </span>
        </div>
        <div style={{ marginLeft: "auto", color: "#9ca3af", fontWeight: 500 }}>
          {question.categoryName || question.category || ""}
        </div>
      </div>
    </article>
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
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const getId = (item) => item?._id ?? item?.id ?? item;

  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch("http://localhost:5001/api/categories");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const fetchQuestions = useCallback(async () => {
    setLoadingQuestions(true);
    try {
      const res = await fetch("http://localhost:5001/api/questions");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const normalized = Array.isArray(data) ? data : [];
      const withCategoryNames = normalized.map((q) => {
        const catId = q.category ?? q.categoryId ?? null;
        const cat = categories.find((c) => getId(c) === catId);
        return { ...q, categoryName: cat?.name ?? q.categoryName ?? "" };
      });
      setQuestions(withCategoryNames);
    } catch {
      setQuestions([]);
    } finally {
      setLoadingQuestions(false);
    }
  }, [categories]);

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    if (
      !newQuestion.title.trim() ||
      !newQuestion.body.trim() ||
      !newQuestion.category
    ) {
      alert("Please fill in Title, Category and Details.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5001/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });
      if (!res.ok) throw new Error();
      await fetchQuestions();
      setNewQuestion({ title: "", body: "", category: "" });
      setShowCreateForm(false);
    } catch {
      alert("There was a problem creating the question.");
    }
  };

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => {
        const catId = getId(q.category) ?? q.categoryId ?? null;
        return catId === selectedCategory;
      })
    : questions;

  const handleCardEnter = (id) => setHoveredQuestionId(id);
  const handleCardLeave = () => setHoveredQuestionId(null);
  const openQuestion = (id) => navigate(`/questions/${id}`);

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-heading">Categories</div>
        <nav className="side-nav">
          <CategoryButton
            name="All Categories"
            isSelected={!selectedCategory}
            onClick={() => setSelectedCategory(null)}
          />
          {loadingCategories ? (
            <div className="empty-text">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="empty-text">No categories yet</div>
          ) : (
            categories.map((cat) => {
              const id = getId(cat);
              return (
                <CategoryButton
                  key={id || cat.name}
                  name={cat.name || "Unnamed"}
                  isSelected={selectedCategory === id}
                  onClick={() => setSelectedCategory(id)}
                />
              );
            })
          )}
        </nav>
      </aside>

      <main className="main-content">
        <div className="top-row">
          <div
            style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}
          >
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <h1 className="page-title">🎵 Instruments For Dummies</h1>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {username ? (
              <div className="greeting">Hello, {username}!</div>
            ) : (
              <div className="greeting" style={{ color: "#9ca3af" }}>
                Not logged in
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-heading-row">
          <h2>Dashboard</h2>
          <button
            className="create-btn"
            onClick={() => setShowCreateForm((s) => !s)}
          >
            {showCreateForm ? "Cancel" : "+ Create Question"}
          </button>
        </div>

        <p className="small-muted">
          {selectedCategory
            ? `Showing ${filteredQuestions.length} question(s) in ${
                categories.find((c) => getId(c) === selectedCategory)?.name ||
                "selected category"
              }`
            : `Showing all ${questions.length} questions`}
        </p>

        {showCreateForm && (
          <section id="create-question-form" className="create-form-card">
            <h3>Create New Question</h3>
            <form onSubmit={handleCreateQuestion}>
              <label className="form-label" htmlFor="q-title">
                Title
              </label>
              <input
                id="q-title"
                className="input-field"
                type="text"
                value={newQuestion.title}
                onChange={(e) =>
                  setNewQuestion((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Short, descriptive title"
                required
              />
              <label className="form-label" htmlFor="q-category">
                Category
              </label>
              <select
                id="q-category"
                className="select-field input-field"
                value={newQuestion.category}
                onChange={(e) =>
                  setNewQuestion((p) => ({ ...p, category: e.target.value }))
                }
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={getId(cat) || cat.name} value={getId(cat)}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <label className="form-label" htmlFor="q-body">
                Question Details
              </label>
              <textarea
                id="q-body"
                className="textarea-field"
                value={newQuestion.body}
                onChange={(e) =>
                  setNewQuestion((p) => ({ ...p, body: e.target.value }))
                }
                placeholder="Add context or details"
                required
              />
              <button type="submit" className="submit-btn">
                Submit Question
              </button>
            </form>
          </section>
        )}

        <section className="questions-list">
          {loadingQuestions ? (
            <div className="empty-text">Loading questions...</div>
          ) : filteredQuestions.length === 0 ? (
            <div className="empty-text">No questions in this category.</div>
          ) : (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={getId(question) || question.title}
                question={{
                  ...question,
                  categoryName:
                    question.categoryName ||
                    categories.find(
                      (c) =>
                        getId(c) === (question.category ?? question.categoryId)
                    )?.name ||
                    "",
                }}
                onOpen={openQuestion}
                isHovered={
                  hoveredQuestionId ===
                  (getId(question) || question._id || question.id)
                }
                onEnter={handleCardEnter}
                onLeave={handleCardLeave}
              />
            ))
          )}
        </section>
        <div style={{ height: 60 }} />
      </main>
    </div>
  );
}
