# 🚀 StudySpark

> Plan your study. Study smarter, not harder.

StudySpark is a personalized study planning web application that helps students decide what to study first by analyzing subjects based on difficulty, confidence level, goals, and exam urgency.

Instead of creating a simple timetable, StudySpark generates a priority-based study plan that adapts to each student's situation.

---

## ✨ Features

### 📚 Subject Management
- Add and manage subjects
- Set difficulty levels
- Set confidence levels
- Add exam dates
- Define study goals

### 🧠 Smart Priority Algorithm

StudySpark calculates a priority score for each subject using:

- Exam urgency
- Subject difficulty
- Confidence level
- Learning goal

Subjects with higher priority scores receive more study time.

### 📅 Personalized Study Plan

Based on the user's available study time, StudySpark creates a plan containing:

- Total study time
- Active learning time
- Review time
- Organization time

### ⚙️ Study Settings

Users can customize:

- Daily study time
- Maximum focus session length
- Break duration
- Main learning goal

Settings are saved and stored securely.

---

## 🏗️ How It Works

User Input
↓
Subject Information
↓
Priority Calculation Algorithm
↓
Study Time Allocation
↓
Personalized Study Plan



The algorithm analyzes each subject and distributes the user's available study time based on priority.

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend / Database
- Supabase

### Deployment
- Vercel

---

## 📂 Project Structure

src
├── algorithms
│ ├── calculatePriority.ts
│ ├── calculateStudyPlan.ts
│ └── calculateStudyRatio.ts
│
|
├── lib
│ └── supabase.ts
│
├── pages
│ ├── Home.tsx
│ └── AddSubject.tsx
│
└── types
  └── Subject.ts


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/d08835149-prog/Midnight-Hackathon.git


### 2. Install dependencies
npm install


### 3. Run the development server
npm run dev

🔮 Future Improvements

## Possible future features:

User authentication
Individual user accounts
Study history tracking
Progress analytics dashboard
AI-powered study recommendations
Calendar integration
Mobile application


