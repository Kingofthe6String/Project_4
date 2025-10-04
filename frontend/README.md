# Instruments For Dummies

## Overview

**Instruments For Dummies** is a web application that allows users to post, categorize, and answer questions about musical instruments. It features a clean, interactive dashboard with dynamic categories, colorful question cards, and an intuitive interface for creating and viewing questions. User authentication provides personalized greetings and session management.

---

## Usage

1. Register a new account or log in with an existing user.
2. Browse categories from the sidebar.
3. Click a category to filter questions.
4. Click on a question card to view details.
5. Add a new question using the **+ Create Question** button.
6. Log out with the **Logout** button in the top-left.

---

## Technologies Used

- **Frontend:** React, React Router, React Hot Toast, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **HTTP Client:** Fetch API / Axios
- **Authentication:** Local storage-based session tracking

---

## Project Structure

frontend/
├─ src/
│ ├─ pages/
│ │ ├─ Login.jsx
│ │ ├─ Registration.jsx
│ │ └─ Dashboard.jsx
│ ├─ lib/
│ │ └─ axios.js
│ ├─ styles.css
│ └─ main.jsx
backend/
├─ models/
│ ├─ User.js
│ ├─ Question.js
│ └─ Category.js
├─ routes/
│ ├─ users.js
│ ├─ questions.js
│ └─ categories.js
├─ controllers/
│ ├─ userController.js
│ ├─ questionController.js
│ └─ categoryController.js
└─ server.js

---

## Future Improvements

- Real-time notifications for new questions or answers
- Upvoting and sorting of questions
- User Web Tokens for authentication
- Enhanced mobile responsiveness
- Search functionality

---

## Contact

**Your Name**  
Email: spaciousguide@gmail.com
GitHub: [https://github.com/Kingofthe6String](https://github.com/Kingofthe6String)
