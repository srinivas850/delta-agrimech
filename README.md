# Delta Agrimech — Official Web Application & Admin Portal

A modern, high-performance web platform for **Delta Agrimech** (inspired by [deltaagrimech.com](https://deltaagrimech.com/)), featuring a customer-facing interactive showcase, dynamic enquiry handling, and a secure PostgreSQL-backed admin dashboard.

---

## 🌾 Features

- **Premium Brand Experience:**
  - Strict Delta Agrimech color palette: Deep Forest Green (`#20792C`), Olive Green (`#608A10`), Fresh Lime (`#99CA3C`), and Charcoal Grey (`#2E3333`).
  - Sleek typography with Google Font **Bai Jamjuree**.
  - Dynamic hero section with golden-hour agricultural background and responsive framing.
  - Interactive equipment showcases:
    - **Delta 9 Pro 100HP & 102HP** (Multispeed & Heavy-Duty)
    - **Delta Baler** (Shaktiman round straw baler)
  - Interactive enquiry forms with instant feedback.
  - WhatsApp floating quick-connect & click-to-call integrations.

- **Neon PostgreSQL Backend:**
  - Persistent database connection to serverless Neon PostgreSQL.
  - Automated schema migration & table initialization (`enquiries` and `admins`).
  - SSL encrypted connections.

- **Secure Admin Portal (`/admin/enquiries`):**
  - Protected admin routes with JWT (JSON Web Token) authentication stored in session.
  - Live enquiry metrics (Total, New, Contacted, In Progress, Closed).
  - Search and filter enquiries by customer name, phone, product, enquiry type, or status.
  - Inline status management with instant optimistic updates and DB persistence.
  - Direct click-to-call and click-to-email actions for rapid response.
  - Admin password change utility.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React, React Router v7
- **Backend:** Node.js, Express.js, PostgreSQL (`pg`), `dotenv`, `cors`, `bcryptjs`, `jsonwebtoken`
- **Database:** Neon Serverless PostgreSQL
- **Media Hosting:** Cloudinary CDN

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/srinivas850/delta-agrimech.git
cd delta-agrimech
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory (refer to `.env.example`):
```env
PORT=5000
DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

### 4. Run the project

Run both frontend and backend concurrently:
```bash
# Terminal 1: Backend Express Server
npm run server

# Terminal 2: Frontend Vite Development Server
npm run dev
```

Visit `http://localhost:5173` to explore the website.  
Access the Admin Dashboard at `http://localhost:5173/admin/login`.

---

## 📁 Project Structure

```
delta-agrimech/
├── public/                 # Static assets & brand icons
├── server/
│   ├── db.js              # Neon PostgreSQL pool & table initialization
│   └── index.js           # Express API endpoints & JWT authentication
├── src/
│   ├── assets/            # Local images & brand logos
│   ├── pages/
│   │   ├── LandingPage.jsx   # Public-facing Delta Agrimech portal
│   │   ├── AdminLogin.jsx    # Secure admin authentication
│   │   └── AdminDashboard.jsx# Real-time enquiries management dashboard
│   ├── App.jsx            # Routing & ProtectedRoute component
│   ├── index.css          # Tailwind CSS & custom brand utilities
│   └── main.jsx           # App entry point
├── .env.example           # Template for environment variables
└── README.md
```

---

## 🔒 Security

- Sensitive credentials (`.env`) are excluded from git history.
- Passwords are encrypted with bcrypt before being stored.
- Admin APIs are secured using HTTP Bearer Token authentication.
