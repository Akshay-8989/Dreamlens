# DreamLens

DreamLens is a unique full-stack application designed to help users journal their dreams and experience them in a new, imaginative way. This project features a modern React frontend and a robust FastAPI backend, powered by the Google Gemini AI.

---

## ✨ Features

* **Dream Journaling:** Easily log your dreams with details like content, emotions, symbols, and themes.
* **AI-Enhanced Dreams:** Leverage the Google Gemini AI to creatively re-imagine and enhance your logged dreams into positive, magical, and vivid stories. The AI expands on your original dream, adding wonderful elements to make it more memorable and uplifting.
* **Intuitive Interface:** A clean and user-friendly frontend built with React and styled with Tailwind CSS.
* **Robust Backend:** A high-performance API built with FastAPI in Python, handling dream data and AI interactions.

---

## 🚀 Technologies Used

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Python 3, FastAPI, Uvicorn
* **AI Integration:** Google Gemini API

---

## ⚠️ Important Note about AI Usage

This project utilizes the Google Gemini API, which has associated usage limits and costs. **For this reason, a live demo link is intentionally NOT provided in this repository.**

If you clone and run this project, you will need your own Google Gemini API Key. Please set it up responsibly and monitor your usage.

---

## ⚙️ Local Setup Instructions

To get DreamLens running on your local machine, follow these steps for both the backend and frontend:

### Prerequisites

* **Python 3.8+**
* **Node.js** and **npm** (or Yarn/pnpm)
* A **Google Gemini API Key** (obtain one from [Google AI Studio](https://ai.google.dev/))

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Akshay-8989/Dreamlens.git](https://github.com/Akshay-8989/Dreamlens.git)
    cd Dreamlens
    ```

2.  **Backend Setup:**
    Navigate to the `dreamlens-backend` directory to set up your Python environment and start the server.
    ```bash
    cd dreamlens-backend
    python -m venv venv           # Create virtual environment
    .\venv\Scripts\activate       # Activate (Windows PowerShell)
    # source venv/bin/activate    # Activate (macOS/Linux Bash)
    pip install -r requirements.txt # Install dependencies
    # Set your Google Gemini API Key:
    # $env:GOOGLE_API_KEY="YOUR_GEMINI_API_KEY" (Windows PowerShell)
    # export GOOGLE_API_KEY="YOUR_GEMINI_API_KEY" (macOS/Linux Bash)
    # Or create a .env file with: GOOGLE_API_KEY="YOUR_GEMINI_API_KEY"
    uvicorn app.main:app --reload # Run the FastAPI server
    ```
    The backend runs on `http://127.0.0.1:8000`.

3.  **Frontend Setup:**
    Open a **new terminal window**, navigate to the `dreamlens-frontend` directory, and launch the React development server.
    ```bash
    cd dreamlens-frontend
    npm install                   # Install dependencies
    npm run dev                   # Run the development server
    ```
    The frontend runs on `http://localhost:5173`.

---

### 🎉 Explore DreamLens!

With both the backend and frontend running, open your web browser to `http://localhost:5173` and start logging and enhancing your dreams!
