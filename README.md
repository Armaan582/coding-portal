# 🖥️ CodePortal — Online Coding Practice Portal

A full-stack coding practice platform built with React, Node.js, MongoDB, and Monaco Editor. Users can sign up, log in, browse coding problems, write code in a real editor, and run it using the Judge0 API.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (Vite), Tailwind CSS, Monaco Editor |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcrypt |
| Code Execution | Judge0 API (RapidAPI) |

---

## 📁 Project Structure

```
coding-portal/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── codeController.js
│   │   └── problemController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Problem.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── codeRoutes.js
│   │   └── problemRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── LoadingSpinner.jsx
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── EditorPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── ProblemsPage.jsx
    │   │   └── SignupPage.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## ⚙️ Setup Instructions (Windows 11 + VS Code)

### Prerequisites
- Node.js v18+ — https://nodejs.org
- VS Code — https://code.visualstudio.com
- MongoDB Atlas account — https://www.mongodb.com/atlas (free tier)
- Judge0 RapidAPI key — https://rapidapi.com/judge0-official/api/judge0-ce (free tier)

---

### Step 1 — Get MongoDB Atlas URI

1. Go to https://www.mongodb.com/atlas and sign up for free
2. Create a new cluster (free M0 tier)
3. Under "Database Access" → Add a database user with username/password
4. Under "Network Access" → Add IP Address → Allow access from anywhere (0.0.0.0/0)
5. Click "Connect" → "Connect your application"
6. Copy the connection string — it looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
   ```

---

### Step 2 — Get Judge0 API Key (Optional but recommended)

1. Go to https://rapidapi.com/judge0-official/api/judge0-ce
2. Sign up for free and subscribe to the Basic plan (free)
3. Copy your **X-RapidAPI-Key** from the API playground

> ⚠️ **Without a Judge0 key**, the app runs in "Demo Mode" — code is received but not actually executed. Everything else works perfectly.

---

### Step 3 — Setup Backend

Open a terminal in VS Code (`Ctrl+`` `) and run:

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env
```

Now open `backend/.env` and fill in your values:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/codingportal?retryWrites=true&w=majority
JWT_SECRET=mySecretKey123ChangeThis
JUDGE0_API_KEY=your_rapidapi_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

---

### Step 4 — Setup Frontend

Open a **new terminal** in VS Code and run:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
```

---

### Step 5 — Run the Project

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
You should see:
```
✅ Connected to MongoDB Atlas
🚀 Server running on http://localhost:5000
✅ Problems seeded successfully
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
You should see:
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

Open your browser at: **http://localhost:5173**

---

## 🎯 Features

- **Authentication** — Signup & Login with JWT tokens stored in localStorage
- **Protected Routes** — Problems and Editor pages require login
- **10 Coding Problems** — Auto-seeded into MongoDB on first run
- **Monaco Editor** — VS Code-quality editor with syntax highlighting
- **4 Languages** — JavaScript, Python, C++, Java with starter templates
- **Code Execution** — Via Judge0 API (or Demo Mode without a key)
- **Output Console** — See your code output instantly
- **Dark Theme** — Professional dark UI with smooth animations

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/signup | Register new user | ❌ |
| POST | /api/auth/login | Login user | ❌ |
| GET | /api/auth/me | Get current user | ✅ |
| GET | /api/problems | Get all problems | ✅ |
| GET | /api/problems/:slug | Get problem by slug | ✅ |
| POST | /api/code/run | Execute code | ✅ |

---

## 💡 Tips

- Press **Ctrl+Enter** in the editor to run code quickly
- Problems are automatically seeded on first backend startup
- The app works in Demo Mode without a Judge0 key
- JWT tokens expire after 7 days — users will need to log in again

---

## 🐛 Common Issues

**MongoDB connection fails:**
- Double-check your connection string in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas Network Access
- Make sure the username/password in the URI are URL-encoded (special chars like `@` need encoding)

**Frontend can't reach backend:**
- Ensure the backend is running on port 5000
- The Vite dev server proxies `/api` to `http://localhost:5000` automatically

**nodemon not found:**
- Run `npm install` inside the `backend` folder again

---

## 📦 Building for Production

```bash
# Build frontend
cd frontend
npm run build

# The dist/ folder can be served statically
```

---

## 🙌 Credits

Built with ❤️ using React, Express, MongoDB, Monaco Editor, and Judge0 API.
