import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SubmitFeedback from "./pages/SubmitFeedback";
import FeedbackList from "./pages/FeedbackList";
import FeedbackDetail from "./pages/FeedbackDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitFeedback />} />
        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/feedback/:id" element={<FeedbackDetail />} />
        <Route path="/feedback/:id/edit" element={<FeedbackDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
