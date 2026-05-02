# SpendLens – Expense Tracker

A clean, interview-ready React expense tracker with Chart.js integration.

## Features
- Add / Edit / Delete expenses (amount, category, date, description)
- Monthly bar chart (Chart.js)
- Category filter: Food, Travel, Bills, Health, Other
- Search bar
- Dark / Light mode toggle
- LocalStorage persistence
- Fully responsive (mobile-friendly)

## Project Structure
```
src/
├── components/
│   ├── ExpenseForm.jsx   # Add / Edit form
│   ├── ExpenseList.jsx   # Renders list of items
│   ├── ExpenseItem.jsx   # Single expense row
│   ├── Filter.jsx        # Search + category pills
│   └── Chart.jsx         # Monthly bar chart
├── App.jsx               # Root state & logic
├── App.css
├── index.js
└── index.css             # CSS variables (light + dark theme)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build
```

## Tech Stack
- React 18 (useState, useEffect, useRef)
- Chart.js 4 + react-chartjs-2
- CSS Variables for theming
- LocalStorage for persistence
