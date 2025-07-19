from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import traceback
import textwrap

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    prompt: str
    context: str

def chunk_text(text: str, max_chars: int = 4000) -> list:
    return textwrap.wrap(text, width=max_chars)

@app.post("/chat")
async def chat_with_summary_and_mcqs(query: Query):
    try:
        prompt = query.prompt.strip()
        context = query.context.strip()

        async with httpx.AsyncClient(timeout=1000) as client:
            # === CASE 1: Just answer the question ===
            if prompt.lower().startswith("answer this:"):
                print("🤖 Detected direct Q&A")

                clean_question = prompt[len("answer this:"):].strip()

                answer_prompt = (
                    "You are a helpful AI assistant. Answer the following question clearly and briefly:\n\n"
                    f"Q: {clean_question}\nA:"
                )

                response = await client.post(
                    "http://localhost:11434/api/generate",
                    json={
                        "model": "gemma3",
                        "prompt": answer_prompt,
                        "stream": False
                    }
                )
                response.raise_for_status()
                data = response.json()
                answer = data.get("response", "").strip()

                return {"answer": answer}

            # === CASE 2: Summarize + MCQ generation ===
            elif prompt.lower().startswith("summarize this:"):
                print("📄 Detected summarization request")

                chunks = chunk_text(context)

                summary_instruction = (
                    "You are an expert summarizer and a dedicated teacher who wants your students to truly understand and succeed.\n"
                    "Summarize the following content by focusing only on the main ideas and key concepts. "
                    "Avoid unnecessary details. Present the summary clearly and in simple language:\n\n"
                )

                all_summaries = []

                for i, chunk in enumerate(chunks):
                    print(f"🧠 Summarizing chunk {i+1}/{len(chunks)}")
                    prompt = f"{summary_instruction}\"\"\"\n{chunk}\n\"\"\""

                    response = await client.post(
                        "http://localhost:11434/api/generate",
                        json={
                            "model": "gemma3",
                            "prompt": prompt,
                            "stream": False
                        }
                    )
                    response.raise_for_status()
                    data = response.json()
                    summary = data.get("response", "").strip()
                    all_summaries.append(summary)

                combined_summary = "\n".join(all_summaries)

                # Generate MCQs
                mcq_prompt = (
                    "You are a professional exam creator.\n"
                    "Based on the following summary, generate exactly 10 multiple-choice questions. "
                    "Each question should have 4 options (A, B, C, D), and indicate the correct answer clearly:\n\n"
                    f"\"\"\"\n{combined_summary}\n\"\"\""
                )

                final_response = await client.post(
                    "http://localhost:11434/api/generate",
                    json={
                        "model": "gemma3",
                        "prompt": mcq_prompt,
                        "stream": False
                    }
                )
                final_response.raise_for_status()
                mcq_data = final_response.json()
                mcqs = mcq_data.get("response", "").strip()

                return {
                    "summary": combined_summary,
                    "mcqs": mcqs
                }

            else:
                return {"response": "Please start your prompt with 'Answer this:' or 'Summarize this:'."}

    except Exception as e:
        print("🔥 Error occurred:")
        traceback.print_exc()
        return {"response": f"Error: {str(e)}"}
