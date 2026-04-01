# Inventory Management System

A full-stack, secure inventory management system built with Node.js, Express, and Supabase PostgreSQL. This project is the final submission for Milestone 03.

## Setup & Execution (Running Locally)

Follow these exact steps to run the application from a completely clean machine setup.

### 1. Prerequisites
You must have [Node.js](https://nodejs.org/) (which includes `npm`) installed on your computer.

### 2. Install Dependencies
Open your terminal, navigate to the root directory `CP476-Group-Project`, and install the required Node.js libraries by running:
```bash
npm install
```
*(This will automatically install `express`, `cors`, `dotenv`, and `@supabase/supabase-js` based on the `package.json` file).*

### 3. Environment/Configuration Notes (`.env`)
To comply with strict security hygiene in Milestone 03, the database API credentials **are not** hardcoded in the codebase. 

You must create a local `.env` file in the root directory before launching:
1. Create a file named exactly `.env` right next to the `server.js` file.
2. Add the following line structure, replacing the placeholder values with the actual project grading keys:
```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the Server
Once dependencies are installed and the `.env` file is correctly configured in the root, boot the backend server by running:
```bash
node server.js
```

### 5. Open the Application
The Node.js server will spin up the backend APIs and simultaneously serve the static HTML frontend. 
Open any modern web browser and navigate directly to:

**[http://localhost:3000/pages/log-in.html](http://localhost:3000/pages/log-in.html)**
