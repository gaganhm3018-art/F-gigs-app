# F$gigs app

A mobile-first financial analytics and income tracking application designed for gig workers and freelancers.

The app helps users:
- track income from multiple platforms
- visualize earnings using charts
- monitor pending payouts
- estimate future income using lightweight AI prediction logic
- manage freelance/gig work finances in one place

---

# Project Goal

The project is designed as a fast MVP (Minimum Viable Product) for submission/demo purposes.

Instead of building a heavy production infrastructure initially, the app focuses on:

- clean mobile UI
- smooth user experience
- working analytics
- realistic workflows
- fast development speed

---

# Tech Stack

## Mobile App

- React Native
- Expo
- TypeScript / JavaScript

---

## Charts & Analytics

- react-native-chart-kit
- react-native-svg

---

## Storage

- AsyncStorage

---

## Future Scalability (Planned)

- Next.js frontend
- Express/NestJS backend
- PostgreSQL database
- Prisma ORM
- ML forecasting service

---

# Features

## Authentication

- Basic login screen
- Mock authentication flow

---

## Dashboard

- Monthly income summary
- Pending payments
- Growth percentage
- Income cards
- Visual analytics

---

## Income Tracking

Users can:
- add income entries
- select work platform
- add payout amount
- add payout date
- track payment status

---

## Analytics

- Monthly income graphs
- Weekly trends
- Platform-wise comparison
- Income growth visualization

---

## AI Prediction System

The app includes a lightweight prediction model that estimates future income based on previous earnings.

Current MVP logic:

```js
const avg =
  incomes.reduce((a, b) => a + b.amount, 0) / incomes.length;

const prediction = avg * 1.15;
```

Future versions can integrate:
- Python ML services
- Scikit-learn
- TensorFlow
- FastAPI

---

# Folder Structure

```text
ikya-gig-workers-app/
│
├── assets/
│
├── src/
│   │
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── AddIncomeScreen.js
│   │   ├── PredictionScreen.js
│   │   └── AnalyticsScreen.js
│   │
│   ├── components/
│   │   ├── IncomeCard.js
│   │   ├── IncomeChart.js
│   │   ├── PredictionCard.js
│   │   ├── Header.js
│   │   └── BottomNavigation.js
│   │
│   ├── storage/
│   │   └── storage.js
│   │
│   ├── utils/
│   │   ├── prediction.js
│   │   └── calculations.js
│   │
│   ├── constants/
│   │   └── colors.js
│   │
│   └── data/
│       └── mockData.js
│
├── App.js
├── package.json
└── README.md
```

---

# Installation Guide

## Step 1 — Clone Repository

```bash
git clone https://github.com/your-username/ikya-gig-workers-app.git
```

---

## Step 2 — Enter Project Folder

```bash
cd ikya-gig-workers-app
```

---

## Step 3 — Install Dependencies

```bash
npm install
```

---

## Step 4 — Install Additional Libraries

```bash
npm install react-native-chart-kit react-native-svg
```

```bash
npm install @react-native-async-storage/async-storage
```

---

## Step 5 — Start Expo Server

```bash
npx expo start
```

---

# Running the App

## Option 1 — Android Device

1. Install Expo Go app
2. Scan QR code from terminal/browser
3. App launches instantly

Expo Go:

urlExpo Gohttps://expo.dev/go

---

## Option 2 — Android Emulator

Use:
- Android Studio Emulator

Android Studio:

urlAndroid Studiohttps://developer.android.com/studio

---

# Core Workflow

```text
User Opens App
        ↓
Login Screen
        ↓
Dashboard
        ↓
Add Income Entry
        ↓
Store Data Locally
        ↓
Generate Analytics
        ↓
Display Charts
        ↓
Predict Future Income
```

---

# Data Storage

The MVP uses AsyncStorage for local persistence.

Advantages:
- lightweight
- fast setup
- offline support
- no backend required
- ideal for hackathon/demo environments

---

# Future Improvements

## Backend Integration

Future architecture:

```text
Mobile App
    ↓
Backend API
    ↓
PostgreSQL Database
    ↓
ML Prediction Service
```

---

## Planned Features

- real authentication
- cloud database
- multi-device sync
- receipt scanning
- OCR support
- AI budgeting assistant
- payout reminders
- tax estimation
- export reports
- PDF generation
- notifications
- dark/light mode

---



# UI Design Philosophy

The application follows a fintech-inspired design system:

- dark modern UI
- smooth cards
- minimal clutter
- high readability
- analytics-focused visuals
- gradient highlights
- clean spacing

---

# System Requirements

## Minimum

- Node.js v18+
- npm v9+
- Expo CLI
- Android device/emulator

---

## Recommended

- Node.js v20+
- VS Code
- Android Studio
- GitHub Codespaces

VS Code:

urlVisual Studio Codehttps://code.visualstudio.com

---

# Development Philosophy

This project prioritizes:

```text
completion speed + presentation quality + clean UX
```

instead of premature enterprise complexity.

The goal is to demonstrate:
- idea validation
- usability
- workflow design
- scalable vision

---

# License

This project is intended for educational, hackathon, and prototype demonstration purposes.

---

# Authors

Developed by Team Zelta-X4
