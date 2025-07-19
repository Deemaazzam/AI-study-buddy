import React, { useState, useRef, useEffect } from 'react';
import "./MainChat.css";
import { assets } from '../../../public/images/assets/assets';
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker?worker";
import { useNavigate } from "react-router-dom";
import Tesseract from 'tesseract.js';

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const MainChat = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const ocrInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const [pdfText, setPdfText] = useState("");
  const [summary, setSummary] = useState("");
  const [mcqs, setMcqs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState("");

  useEffect(() => {
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserPrompt((prev) => (prev ? prev + " " : "") + transcript);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech recognition error:", err);
      }
    }
  };

  const openFileDialog = () => fileInputRef.current.click();
  const openOcrDialog = () => ocrInputRef.current.click();

  const handleFileChange = async (e) => {
    setError(""); setPdfText(""); setSummary(""); setAiReply(""); setUserPrompt("");
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") return setError("Please upload a valid PDF.");

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          text += pageText + "\n\n";
        }
        setPdfText(text);
        setPdfUploaded(true);
        setIsTyping(true);
        console.log("📄 Extracted PDF text:", text);

        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "Summarize this:", context: text }),
        });

        const data = await response.json();
        console.log("📦 Data returned from backend:", data);
        setSummary(data.summary || "No summary received.");
        setMcqs(data.mcqs || "");
        setIsTyping(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError("PDF parsing failed."); setLoading(false); setIsTyping(false);
    } finally {
      setLoading(false);
    }
  };

  const handleOcrFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOcrLoading(true); setOcrError(""); setSummary(""); setAiReply(""); setUserPrompt("");
    setIsTyping(true);
    const imageUrl = URL.createObjectURL(file);

    try {
      const result = await Tesseract.recognize(imageUrl, "eng");
      const extractedText = result.data.text.trim();
      console.log("✅ OCR Extracted Text:", extractedText);

      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Answer this:", context: extractedText }),
      });

      const data = await response.json();
      setSummary(data.answer || data.summary || "No answer received.");
      setIsTyping(false);
    } catch (err) {
      console.error("OCR error:", err);
      setOcrError("OCR failed.");
      setIsTyping(false);
    } finally {
      URL.revokeObjectURL(imageUrl);
      setOcrLoading(false);
    }
  };

  const handleSendToAI = async () => {
    if (!userPrompt.trim()) return;
    setIsTyping(true);
    setAiReply("");

    // Prefix user prompt with "Answer this:" if not already present
    let promptToSend = userPrompt.trim();
    if (!promptToSend.toLowerCase().startsWith("answer this:")) {
      promptToSend = `Answer this: ${promptToSend}`;
    }

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToSend, context: summary }),
      });
      const data = await response.json();
      setAiReply(data.answer || data.response || "No reply received.");
    } catch {
      setAiReply("Error talking to AI.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>AI Study Buddy</p>
        <img src={assets.user_icon} alt="User icon" />
      </div>

      <div className="main-container">
        <div className="greet">
          <p><span>Hello, User</span></p>
          <p>How can I help you?</p>
        </div>

        <div className="cards-ai-container">
          {!pdfUploaded && !summary && !isTyping ? (
            <div className="cards">
              <div className="card"><p>Suggest ideas</p><img src={assets.compass_icon} alt="" /></div>
              <div className="card"><p>Help with Code</p><img src={assets.bulb_icon} alt="" /></div>
              <div className="card"><p>Study</p><img src={assets.message_icon} alt="" /></div>
              <div className="card"><p>ETC</p><img src={assets.code_icon} alt="" /></div>
            </div>
          ) : (
            <div className="ai-reply">
              <strong>📘 Summary:</strong>
              {isTyping ? <TypingAnimation /> : <p className="futuristic-summary">{summary}</p>}
              {aiReply && (
                <>
                  <strong>💬 Answer:</strong>
                  <p>{aiReply}</p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="main-bottom">
          <div className="upload-box">
            {!pdfUploaded && (
              <>
                <p>Upload a PDF to get started</p>
                <button className="upload-btn" onClick={openFileDialog}>
                  <img src={assets.pdf_icon} alt="Upload PDF" /> Upload PDF
                </button>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {loading && <p>Loading PDF...</p>}
            {error && <p className="error-message">{error}</p>}
          </div>

          {/* OCR upload always visible */}
          <div className="ocr-upload-box">
            <p>Or upload an image to extract text</p>
            <button className="upload-btn" onClick={openOcrDialog} disabled={ocrLoading}>
              {ocrLoading ? "Extracting..." : (
                <>
                  <img src={assets.pdf_icon} alt="OCR Upload" /> Upload Image for OCR
                </>
              )}
            </button>
            <input
              type="file"
              ref={ocrInputRef}
              accept="image/*"
              onChange={handleOcrFileChange}
              style={{ display: "none" }}
            />
            {ocrError && <p className="error-message">{ocrError}</p>}
          </div>

          {(pdfUploaded || summary) && (
            <>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Ask a question"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                />
                <div>
                  <img src={assets.gallery_icon} alt="" />
                  <img
                    src={assets.mic_icon}
                    onClick={startListening}
                    title={isListening ? "Listening..." : "Click to speak"}
                    style={{ cursor: "pointer" }}
                  />
                  <img src={assets.pdf_icon} onClick={openFileDialog} style={{ cursor: "pointer" }} />
                  <img
                    src={assets.quiz_icon}
                    onClick={() => navigate("/quiz", { state: { mcqs } })}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={assets.send_icon}
                    alt="Send"
                    onClick={handleSendToAI}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </>
          )}

          <p className="bottom-info">AI Study Buddy can make mistakes. Please double check results.</p>
        </div>
      </div>
    </div>
  );
};

const TypingAnimation = () => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <p>Gemma3 is typing{dots}</p>;
};

export default MainChat;
