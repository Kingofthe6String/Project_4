import { Route, Routes } from "react-router";

import CreatePage from "./pages/CreatePage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QuestionDetail from "./pages/QuestionDetail";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
      </Routes>
    </div>
  );
};
export default App;
