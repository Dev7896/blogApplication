# MERN Blog Application

A full-stack **Blog Platform** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) where users can create, view, and interact with blog posts.  
It includes an **Admin Dashboard** for managing posts and comments.

---

## 🚀 Features
- User signup/login (JWT authentication)
- Create, edit, and delete blog posts
- Comment system
- Admin dashboard for content moderation
- Responsive UI
- Image uploads using ImageKit.io

---

## 🛠️ Tech Stack
**Frontend:** React.js, React Router, Axios, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Other Tools:** ImageKit.io, React Query, Lucide Icons, React Spinners

---

## 📂 Folder Structure
```
root/
│
├── backend/      # Express.js backend API
├── client/       # React.js frontend
├── .gitignore
├── README.md
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2️⃣ Install dependencies for both frontend & backend
```bash
cd backend && npm install
cd ../client && npm install
```

### 3️⃣ Configure Environment Variables

**Backend (`backend/.env`)**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

**Frontend (`client/.env`)**
```
VITE_API_URL=http://localhost:5000
VITE_IMAGEKIT_PUBLIC_KEY=your_public_key
VITE_IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

---

## ▶️ Running the App

**Backend**
```bash
cd backend
npm run dev
```

**Frontend**
```bash
cd client
npm run dev
```

The app will be available at: **http://localhost:5173** (frontend)  
Backend runs on: **http://localhost:5000**

---


---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
