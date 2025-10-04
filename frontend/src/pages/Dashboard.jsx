import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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

  // Get username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch categories from API
  useEffect(() => {
    fetch("http://localhost:5001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch questions from API
  useEffect(() => {
    fetch("http://localhost:5001/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        // Refresh questions list
        const updatedQuestions = await fetch(
          "http://localhost:5001/api/questions"
        ).then((res) => res.json());
        setQuestions(updatedQuestions);

        // Reset form
        setNewQuestion({ title: "", body: "", category: "" });
        setShowCreateForm(false);
      }
    } catch (err) {
      console.error("Error creating question:", err);
    }
  };

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => {
        const catId = q.category || q.categoryId;
        return catId === selectedCategory;
      })
    : questions;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Sidebar - Categories */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>Categories</h2>
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: "12px",
              textAlign: "left",
              backgroundColor: !selectedCategory ? "#007bff" : "white",
              color: !selectedCategory ? "white" : "black",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: !selectedCategory ? "bold" : "normal",
            }}
          >
            All Categories
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              style={{
                padding: "12px",
                textAlign: "left",
                backgroundColor:
                  selectedCategory === cat._id ? "#007bff" : "white",
                color: selectedCategory === cat._id ? "white" : "black",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: selectedCategory === cat._id ? "bold" : "normal",
              }}
            >
              {cat.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content - Questions */}
      <main style={{ flex: 1, padding: "40px" }}>
        {/* Header with username and logout */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {username && (
            <h2 style={{ margin: 0, color: "#333" }}>Hello, {username}!</h2>
          )}

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Logout
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h1 style={{ margin: 0 }}>Dashboard</h1>

          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {showCreateForm ? "Cancel" : "+ Create Question"}
          </button>
        </div>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          {selectedCategory
            ? `Showing ${filteredQuestions.length} question(s) in ${
                categories.find((c) => c._id === selectedCategory)?.name
              }`
            : `Showing all ${questions.length} questions`}
        </p>

        {/* Create Question Form */}
        {showCreateForm && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              marginBottom: "30px",
              border: "1px solid #ddd",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Create New Question</h3>
            <form onSubmit={handleCreateQuestion}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                  }}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={newQuestion.title}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, title: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                  }}
                >
                  Category
                </label>
                <select
                  value={newQuestion.category}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, category: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                  }}
                >
                  Question Details
                </label>
                <textarea
                  value={newQuestion.body}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, body: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Submit Question
              </button>
            </form>
          </div>
        )}

        {/* Questions List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredQuestions.length === 0 ? (
            <p style={{ color: "#999" }}>No questions in this category.</p>
          ) : (
            filteredQuestions.map((question) => (
              <div
                key={question._id}
                onClick={() => navigate(`/questions/${question._id}`)}
                style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
                  {question.title}
                </h3>
                <p style={{ color: "#555", marginBottom: "15px" }}>
                  {question.body}
                </p>

                <div style={{ fontSize: "14px", color: "#666" }}>
                  {question.answered ? (
                    <span style={{ color: "green", fontWeight: "500" }}>
                      ✓ {question.answers?.length || 0} answer(s)
                    </span>
                  ) : (
                    <span style={{ color: "red", fontWeight: "500" }}>
                      ✗ Not answered yet
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
