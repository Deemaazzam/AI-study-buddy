import React, { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker?worker";

// Configure pdfjs to use the worker
pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker();

const PdfUploadTest = () => {
  const fileInputRef = useRef(null);
  const [pdfText, setPdfText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    setError("");
    setPdfText("");
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async function () {
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
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError("Failed to read PDF file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>PDF Upload and Text Extractor Test</h1>

      <button
        onClick={openFileDialog}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      >
        Upload PDF
      </button>

      <input
        type="file"
        ref={fileInputRef}
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {loading && <p>Loading and extracting text...</p>}

      {error && (
        <p style={{ color: "red", fontWeight: "bold", marginTop: "1rem" }}>
          {error}
        </p>
      )}

      {pdfText && (
        <div
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#f9fafb",
            padding: "1rem",
            borderRadius: "0.5rem",
            maxHeight: "400px",
            overflowY: "auto",
            marginTop: "1rem",
            border: "1px solid #ddd",
          }}
        >
          {pdfText}
        </div>
      )}
    </div>
  );
};

export default PdfUploadTest;
