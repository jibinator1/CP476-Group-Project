# Inventory Management System
**CP476 – Internet Computing | Group 11**

George Xie (169044179) · Jibin Im (169062155) · Calvin Nguyen (18540910)

---

## Overview

The Inventory Management System is a full-stack web application designed to help small businesses efficiently track products, manage stock levels, and make informed restocking decisions. The system provides a simple and intuitive interface that supports multiple user roles, including consumers, inventory managers, and shelf stockers.

---

## Tech Stack

| Layer    | Technology             |
|----------|------------------------|
| Frontend | HTML, CSS, JavaScript  |
| Backend  | Node.js + Express      |
| Database | Supabase (PostgreSQL)  |

---

## Project Structure
```
CP476-Group-Project/
├── assets/
│   ├── inventory.css       # Global styles
│   └── inventory.js        # Frontend logic
├── backend/
│   └── api-bridge.js       # Client-side API helper
├── docs/
│   └── TESTING_REPORT.md   # Testing summary report
├── pages/
│   ├── log-in.html         # Login page
│   ├── inventory.html      # Main inventory management page
│   ├── product-page.html   # Individual product detail page
│   └── customer-dashboard.html  # Customer-facing dashboard
├── index.html              # Landing / redirect page
├── server.js               # Express backend + API routes
├── package.json
└── .env                    # Environment variables (not committed)
```
---

## Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)
- A Supabase project with the required tables (see Database Setup below)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/jibinator1/CP476-Group-Project
cd CP476-Group-Project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:
```bash
touch .env
```

Add the following to `.env`:
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

To find these values:
1. Go to [supabase.com](https://supabase.com) and open your project
2. Navigate to **Settings → API**
3. Copy the **Project URL** and **anon/public** key

### 4. Start the server
```bash
node server.js
```

You should see:
backend: http://localhost:3000
frontend: http://localhost:3000/pages/log-in.html

### 5. Open the app

Visit in your browser:
http://localhost:3000/pages/log-in.html

---

## Database Setup

The application expects the following tables in your Supabase project:

| Table         | Description                        |
|---------------|------------------------------------|
| `products`    | Inventory items                    |
| `categories`  | Product categories                 |
| `competitors` | Competitor pricing data            |
| `sales_log`   | Sales history per product          |
| `users`       | User accounts and roles            |

---

## API Endpoints

| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| GET    | `/api/inventory`            | Get all inventory items      |
| GET    | `/api/categories`           | Get all categories           |
| POST   | `/api/products`             | Add a new product            |
| PUT    | `/api/products/:id`         | Update an existing product   |
| DELETE | `/api/products/:id`         | Delete a product             |
| GET    | `/api/suppliers/:productId` | Get competitor prices        |
| GET    | `/api/sales/:productId`     | Get sales history            |
| POST   | `/api/sales`                | Log a sale                   |
| POST   | `/api/auth/signin`          | Sign in a user               |
| POST   | `/api/auth/signup`          | Register a new user          |

---

## Features

- View, add, edit, and delete inventory items (full CRUD)
- Search and filter items by name and category
- Low stock indicators with configurable thresholds
- Competitor price comparison per product
- Sales log tracking
- Role-based access (manager vs. staff)
- Server-side input validation on all POST/PUT routes

---

## Known Limitations

- Passwords are stored as plain text — not suitable for production use
- No automated test suite; all testing was performed manually
- Application has not been tested on mobile viewports
- Competitor price data is manually entered, not pulled from a live API

---
