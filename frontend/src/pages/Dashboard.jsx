import { useState, useEffect } from "react";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mock fetch (replace with your backend API calls later)
  useEffect(() => {
    setCategories([
      { _id: "1", name: "JavaScript", description: "JS-related questions" },
      { _id: "2", name: "React", description: "Frontend with React" },
    ]);

    setQuestions([
      {
        _id: "101",
        title: "How do I use useState?",
        body: "I want to manage state in React but not sure how.",
        category: "2",
        answered: true,
        answer: "Import useState from React and call it inside your component.",
      },
      {
        _id: "102",
        title: "What is closure?",
        body: "Explain closure in JavaScript.",
        category: "1",
        answered: false,
      },
    ]);
  }, []);

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => q.category === selectedCategory)
    : questions;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Category Selector */}
      <div className="space-x-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded ${
            !selectedCategory ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`px-3 py-1 rounded ${
              selectedCategory === cat._id
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div
            key={q._id}
            className="p-4 rounded-lg shadow bg-white border space-y-2"
          >
            <h2 className="font-semibold">{q.title}</h2>
            <p className="text-sm text-gray-600">{q.body}</p>
            {q.answered ? (
              <p className="text-green-600 font-medium">✅ {q.answer}</p>
            ) : (
              <p className="text-red-500 font-medium">❌ Not answered yet</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
