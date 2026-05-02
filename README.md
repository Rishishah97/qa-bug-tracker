# 🐛 BugTrackr — QA Bug Tracker App

A professional **Bug Tracking Application** built with React as a Software QA Portfolio project. It demonstrates real-world QA skills including bug lifecycle management, severity classification, filtering, and reporting.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- **Dashboard** — Stats overview with bugs by severity, affected modules, and recent activity
- **Bug List** — Full searchable, filterable, sortable table of all bug reports
- **Bug Detail Panel** — View full bug info including steps to reproduce, expected vs actual results
- **Status Management** — Update bug status directly from the detail panel (Open → In Progress → Resolved → Closed)
- **New Bug Form** — Submit new bug reports with full validation
- **Delete Bugs** — Remove resolved or invalid bugs from the tracker
- **Persistent State** — All data managed in React state (no backend needed)

---

## 🧪 QA Concepts Demonstrated

| Concept | Where |
|---|---|
| Bug severity classification (Critical/High/Medium/Low) | Bug form & badges |
| Bug lifecycle / status transitions | Detail panel status editor |
| Structured reproduction steps | Bug form & detail view |
| Expected vs Actual result documentation | Bug form & detail view |
| Environment capture | Bug form |
| Module-level tracking | Filter & module chart |
| Search & filter for triage | Bug list toolbar |
| Metrics & reporting | Dashboard charts |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/qa-bug-tracker.git
cd qa-bug-tracker
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Badge.jsx        # Severity & Status badge components
│   ├── Sidebar.jsx      # Navigation sidebar
│   ├── Dashboard.jsx    # Overview stats & charts
│   ├── BugList.jsx      # Filterable bug table
│   ├── BugDetail.jsx    # Bug detail slide-over panel
│   └── NewBugForm.jsx   # New bug submission form
├── data/
│   └── bugs.js          # Seed data & constants
├── App.jsx              # Root component & state management
├── index.js             # Entry point
└── index.css            # Global styles & design tokens
```

---

## 🎨 Tech Stack

- **React 18** — UI framework
- **JavaScript (ES6+)** — No TypeScript, keeping it accessible
- **CSS Custom Properties** — Design token system for theming
- **DM Sans + JetBrains Mono** — Typography

---

## 🛠️ Possible Extensions

- [ ] Add localStorage persistence
- [ ] Export bugs to CSV
- [ ] Add test case management module
- [ ] Integrate with GitHub Issues API
- [ ] Add chart library (Recharts) for richer reporting
- [ ] User authentication with Firebase

---

## 👤 Author

Built by **[Your Name]** as a QA Portfolio project.

---

## 📄 License

MIT License — feel free to use this for your own portfolio!
