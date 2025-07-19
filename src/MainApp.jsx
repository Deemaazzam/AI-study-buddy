import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App"; // your full landing page
import ChatbotPage from "./pages/ChatbotPage"; // the new chatbot page
import SignUp from './pages/SignUp'
import Quiz from './././components/Quiz/Quiz'
import PdfUploadTest from "./components/test";
export default function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/signin" element={<SignUp/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
      </Routes>
    </Router>
  );
}