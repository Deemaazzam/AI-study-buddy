from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

# Enable CORS for your frontend (adjust origin as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  
        database="ai_study_buddy"
    )

# Pydantic models
class User(BaseModel):
    username: str
    password: str
    email: str

class LoginInput(BaseModel):
    username: str
    password: str

class CourseMaterial(BaseModel):
    title: str
    content: str
    user_id: int
# Route to add course material
@app.post("/course_material/")
def create_course_material(course_material: CourseMaterial):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        # Insert course material into the database
        cursor.execute(
            "INSERT INTO coursematerials (title, content, user_id) VALUES (%s, %s, %s)",
            (course_material.title, course_material.content, course_material.user_id),
        )
        conn.commit()
        return {"message": "Course material added successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


# Signup route
@app.post("/auth/signup")
def signup(user: User):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users WHERE username = %s", (user.username,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Username already exists")

        cursor.execute(
            "INSERT INTO users (username, password, email) VALUES (%s, %s, %s)",
            (user.username, user.password, user.email),
        )
        conn.commit()
        return {"message": "Account created successfully!"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Login route
@app.post("/auth/login")
def login(data: LoginInput):
    print("Login attempt:", data.username, data.password)  # debug print
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT * FROM users WHERE username = %s AND password = %s",
            (data.username, data.password),
        )
        user = cursor.fetchone()
        print("DB query result:", user)  # debug print
        if not user:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        return {
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"],
            },
        }
    finally:
        cursor.close()
        conn.close()