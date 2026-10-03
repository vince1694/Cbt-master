# CBT Master — JAMB UTME & WAEC WASSCE Practice Portal 🇳🇬

A comprehensive, state-of-the-art Computer-Based Test (CBT) and e-learning platform modeled after the official **JAMB UTME** and **WAEC (WASSCE)** examination halls. Built with authentic vetted past questions, departmental tracks, candidate analytics, Brevo email OTP verification, MongoDB Atlas cloud synchronization, and offline-first Progressive Web App (PWA) capabilities.

---

## 🚀 Key Features

### 1. Dual Track Examination Simulator
- **JAMB UTME Mode**:
  - Full 4-subject combination tailored by department:
    - **Science**: Use of English, Mathematics, Physics, Chemistry
    - **Arts**: Use of English, Literature in English, Government, Christian Religious Studies (CRS)
    - **Commercial**: Use of English, Mathematics, Economics, Financial Accounting
  - Realistic scaled JAMB UTME scoring system (out of 400 marks).
  - Official JAMB 8-key keyboard shortcuts (`A`, `B`, `C`, `D`, `P` for previous, `N` for next, `S` for submit, `R` for reverse/clear).
  - Built-in draggable On-Screen CBT Calculator.
  - Urgent countdown timer with alert pulsing under 5 minutes.
- **WAEC WASSCE Mode**:
  - Single-subject practice mode with official WAEC 9-point grading system: **A1** (Distinction, 75%+), **B2**, **B3**, **C4**, **C5**, **C6** (Credit Pass), **D7**, **E8**, **F9** (Fail).

### 2. Security & Brevo Email Authentication
- **6-Digit OTP Email Verification**: Powered by Brevo (Sendinblue) transactional email API & SMTP relay.
- Cryptographically hashed codes (SHA-256) with 10-minute expiry and 60-second resend cooldown.
- Welcome emails, password reset links with secure tokens, and daily study streak notifications.
- JWT-authenticated sessions with local-first offline fallback.

### 3. Aspirant Profile & Target Tracker
- Set and monitor your Target JAMB Score (e.g. 300/400), preferred university (e.g. UNILAG, UI, OAU, ABU, UNN), and course of study.
- Live stats: total tests completed, average score, personal best, study hours, and consecutive day streak.
- Cloud synchronized across devices with real-time profile editing and secure password management.

### 4. Interactive Learning Hubs
- **The Life Changer Hub**: Comprehensive chapter summaries, characters, themes, and past questions for the compulsory JAMB novel by Khadija Abubakar Jalli.
- **Formula Cheatsheet**: Quick revision formulas for Physics, Chemistry, and Mathematics.
- **Course & Subject Advisor**: Subject combinations and O'Level requirements for Nigerian universities.
- **Daily 10-Question Sprint**: Quick daily challenges to maintain discipline.
- **Interactive Question Bank & Drill**: Filter by subject, year, topic, or exam type with instant explanations.
- **Result Slip & WhatsApp Sharing**: Official formatted result slip with one-click WhatsApp sharing to parents, tutors, and study groups.

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (Modern Glassmorphism & Responsive Design), ES6+ JavaScript Modules.
- **Backend**: Node.js, Express.js, Mongoose (MongoDB Atlas ODM).
- **Email Service**: Brevo API & SMTP Relay.
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt password hashing.
- **Offline / PWA**: Service Worker (`sw.js`) and Web App Manifest (`manifest.json`).

---

## 💻 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- Free MongoDB Atlas cluster or local MongoDB instance
- Free Brevo account (for transactional emails)

### 1. Backend Server Setup

```bash
cd server
npm install
```

Copy the environment template and set your credentials:

```bash
cp .env.example .env
```

Edit `server/.env` with your credentials:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
BREVO_API_KEY=your_brevo_api_key
BREVO_SMTP_KEY=your_brevo_smtp_key
BREVO_SMTP_LOGIN=your_brevo_login_email
EMAIL_SENDER_ADDRESS=your_verified_sender_email
```

Start the backend:
```bash
node server.js
```
The server will run at `http://localhost:5000`.

### 2. Running the Frontend

Open `index.html` directly in any modern browser, or serve it using your preferred local server:

```bash
# Using VS Code Live Server, or Python:
python -m http.server 5500
```
Open `http://localhost:5500` in your browser.

---

## ⌨️ JAMB 8-Key Keyboard Shortcuts Reference

| Key | Action |
|:---:|:---|
| **A** | Select Option A |
| **B** | Select Option B |
| **C** | Select Option C |
| **D** | Select Option D |
| **P** | Jump to **Previous** Question |
| **N** | Jump to **Next** Question |
| **R** | **Reverse** / Clear selected choice |
| **S** | Open **Submit** Exam dialog |

---

## 📄 License

MIT License — Feel free to use and adapt for academic and personal preparation.
