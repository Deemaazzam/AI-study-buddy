import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rawMcqs = location.state?.mcqs || "";

  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const op_arr = [Option1, Option2, Option3, Option4];

  // Parse MCQ string into structured format
  useEffect(() => {
    const parsed = parseMCQs(rawMcqs);
    setData(parsed);
    if (parsed.length > 0) {
      setQuestion(parsed[0]);
    }
  }, [rawMcqs]);

  const parseMCQs = (text) => {
    if (!text) return [];

    // Split by "**[number]." pattern
    const blocks = text.split(/\*\*\s*\d+\./).slice(1); // ignore intro/instructions

    return blocks.map((block) => {
      const lines = block.trim().split('\n').map(line => line.trim());

      const questionLine = lines[0]?.replace(/\*\*/g, '').trim();
      const optionLines = lines.slice(1, 5);
      const correctLine = lines.find(line => line.toLowerCase().includes("correct answer"));

      const options = optionLines.map(line => line.replace(/^[A-D]\.\s*/, '').trim());
      const correctLetter = correctLine?.match(/Correct Answer:\s*([A-D])/i)?.[1]?.toUpperCase();

      const correctIndex = { A: 1, B: 2, C: 3, D: 4 }[correctLetter] || 0;

      return {
        question: questionLine,
        option1: options[0],
        option2: options[1],
        option3: options[2],
        option4: options[3],
        ans: correctIndex,
      };
    }).filter(q => q.question && q.ans); // Filter out any malformed questions
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add('wrong');
        op_arr[question.ans - 1]?.current?.classList.add('correct');
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuestion(data[newIndex]);
      setLock(false);
      op_arr.forEach((ref) => {
        ref.current?.classList.remove('correct');
        ref.current?.classList.remove('wrong');
      });
    }
  };

  return (
    <div className="quiz-background">
      <div className="main-cont">
        <div className="cont">
          <h1>AI Generated Quiz</h1>
          <hr />
          {result ? (
            <>
              <h2>You Scored {score} out of {data.length}</h2>
              <button onClick={() => navigate("/chatbot")}>Return to chatbot</button>
            </>
          ) : question ? (
            <>
              <h2>{index + 1}. {question.question}</h2>
              <ul>
                <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
              </ul>
              <button onClick={next}>Next</button>
              <div className="index">{index + 1} of {data.length} question</div>
            </>
          ) : (
            <p>Loading quiz...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
