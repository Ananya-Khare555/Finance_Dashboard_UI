# 💼 FinDash – Finance Dashboard

A modern, production-ready **Finance Dashboard** built with **React, Vite, TypeScript, and Tailwind CSS**.
Designed with a clean SaaS-style UI inspired by tools like Stripe, Mercury, etc.

---

## 🚀 Features

* 📊 Interactive dashboard (charts & analytics)
* 🌙 Dark / Light mode support
* 💾 Data persistence using Local Storage
* 🔌 Mock API integration (for frontend-first development)
* 📁 Export data (CSV / JSON)
* 🔍 Advanced filtering & grouping
* ⚡ Smooth animations & transitions
* 📱 Fully responsive design

---

## 🧱 Tech Stack

* **Frontend:** React + Vite + TypeScript
* **Styling:** Tailwind CSS + shadcn/ui
* **State/Data:** React Query
* **Charts:** Recharts
* **Forms:** React Hook Form + Zod
* **UI Components:** Radix UI

---

## 📂 Project Structure

```
src/
  components/     → Reusable UI components
  pages/          → App pages (Dashboard, etc.)
  hooks/          → Custom React hooks
  context/        → Global state providers
  services/       → API layer (mock + real)
  data/           → Static/mock data
  lib/            → Utility functions
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/Ananya-Khare555/Finance_Dashboard_UI.git
cd finance-dashboard
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Run development server

```
npm run dev
```

Open:

```
http://localhost:8080
```

---


## 🔌 API Integration

Currently uses a **Mock API layer** for development.

Location:

```
src/services/mockApi.ts
```

👉 Replace with real backend API later:

```
src/services/api.ts
```

---

## 📊 Data Flow

```
UI → React Query → Mock API → Local State
```


## 📦 Export Functionality

Supports:

* CSV export
* JSON export


## 🎨 UI Design Principles

* Minimal & clean layout
* Soft shadows & rounded corners
* High readability typography
* Responsive grid system
* Consistent spacing system

---

