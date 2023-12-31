from fastapi import FastAPI, Request, Query
from fastapi.responses import JSONResponse  # Import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
import uvicorn
import os
from main import gpt3_logs, main
from decouple import config
from typing import Optional


app = FastAPI()

secret_key_from_env = config('OPENAI_API_KEY')

# Configure CORS settings to allow access from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow access from any origin
    allow_credentials=True,
    allow_methods=["*"],  # You can restrict HTTP methods if needed
    allow_headers=["*"],  # You can restrict headers if needed
)

@app.get("/")
def home():
    return "Hit from VBot"

@app.get("/api/response")
async def get_response(message: str, chat_log: Optional[str] = Query(None)):
    if chat_log is None:
        chat_log = gpt3_logs('', '', chat_log)
    
    response = main(message, chat_log)
    
    if len(response) != 0:
        chat_log = gpt3_logs(message, response, chat_log)
        # Return a JSON response with the chatbot's response and updated chatlog
        return JSONResponse(content={"response": response})
    else:
        # Return an error response if something goes wrong
        return JSONResponse(content={"error": "Oops! Something went wrong"}, status_code=500)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
