# Inventory Management System

## Project Overview
The Inventory Management System is designed to help small businesses efficiently track products, manage stock levels, and make informed restocking decisions. The system provides a simple and intuitive interface that supports multiple user roles, including consumers, inventory managers, and shelf stockers.

## Motivation
Many small businesses rely on manual or inefficient methods to manage inventory, which can lead to stock inaccuracies and lost revenue. This project aims to address these challenges by offering a centralized and organized solution that improves inventory visibility, reduces errors, and supports better business decision-making.

## Target Users
- Consumers
- Small business owners
- Inventory managers
- Shelf stockers

## Core Features (Implemented in Milestone 2)
- Search inventory and view product availability
- Add, update, and remove inventory items
- Track product quantities and stock levels
- Low-stock alerts for inventory managers
- Supplier price comparison functionality

## Tech Stack (Tentative)
- Frontend: HTML, CSS, JavaScript (vanilla); design tokens and modern UI (see `inventory.html`)
- Backend / data: **Supabase** (optional). Backend code is in `backend/` (Supabase client + `inventoryService.js`). When configured, the app uses your Supabase project for products and categories.
- Version Control: GitHub

## How to Run Locally

### Front-End
1. Clone the repo: `git clone https://github.com/jibinator1/CP476-Group-Project`
2. Open the project folder and open `inventory.html` in a browser (e.g. double-click the file or use “Open File” in your browser).
3. Alternatively, serve the folder with any static server (e.g. `npx serve .` or `python -m http.server 8000`) and visit the root, then open `inventory.html`.

The main inventory workflow (dashboard, product detail, add/edit/delete) runs in the browser. By default it uses **mock data**. To use the **Supabase backend**: (1) Create a Supabase project and tables (`products`, `categories`). (2) Copy `backend/supabaseConfig.example.js` to `backend/supabaseConfig.js` and set your project URL and anon key. (3) Open `inventory.html` via a local web server (e.g. `npx serve .`) so module scripts load; then open `http://localhost:8000/inventory.html`. The app will load and persist data via `backend/inventoryService.js`.

### Back-End (Supabase)
The repo includes a Supabase-based backend in `backend/`:
- `backend/supabaseClient.js` — creates the Supabase client (uses `window.__SUPABASE_URL__` and `window.__SUPABASE_ANON_KEY__`).
- `backend/inventoryService.js` — fetchInventory, addProduct, updateProduct, deleteProduct, fetchCategories, searchProducts, updateProductCount, addCategory, addUser.
- `backend/supabaseConfig.example.js` — copy to `supabaseConfig.js` and add your project URL and anon key (do not commit real keys).

No Node server is required: the front-end talks to Supabase from the browser. For a separate Express/PostgreSQL server, use the `server/` folder when present.

## Project Structure
/docs - Documentation and meeting notes
/src - Source code
README.md - Project overview
## Team Members
- George Xie  
- Jibin Im  
- Calvin Nguyen  

## Project Management
- GitHub Projects Kanban board is used for task tracking
- Milestones and tasks are assigned and updated regularly
- Team communication is handled via Discord and Instagram group chat

## Status
Milestone 1 – Planning and initial setup completed.  
Milestone 2 – Front-end implementation: core screens and workflow in `inventory.html` (mock data); database design and back-end skeleton in repo.
