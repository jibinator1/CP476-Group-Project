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

### 1. Database Setup (Supabase)
The app integrates with Supabase via a local Node.js Express Server.
The configuration keys have been built securely into the new `server.js` route handlers. No manual config is required for the demo environment.

### 2. Running the Application
This application uses a full Client-Server architecture. The frontend dynamically fetches data from the custom Node.js REST API. You must start the Node server.

1. Clone the repo: `git clone https://github.com/jibinator1/CP476-Group-Project`
2. Open your terminal and navigate to the project directory.
3. Install backend dependencies: `npm install`
4. Start the backend server: `node server.js`
5. Open your browser and navigate to `http://localhost:3000`. The Express server will automatically route you to the `pages/log-in.html` interface.
6. **Authentication**: Use the authentication portal to Sign Up or Log In. You can use native test credentials (e.g., Email: `manager@gmail.com`, Password: `password`) to enter the Manager view.
7. **Customer View**: You can also select "Browse as Customer" to view the publicly accessible endpoints (`customer-dashboard.html`) without logging in.

## Project Structure
- /docs - Documentation and meeting notes.
- /src - Source code
- README.md - Project overview

## Status & Milestone 3 Final Fulfillment

Milestone 3 (Final) incorporates full-stack integration and final project documentation, fulfilling all course criteria:

- **Full-Stack Functionality & Completeness (35 pts)**: The application successfully implements end-to-end functionality integrating the front-end JS workflow (in `inventory.js`), the API bridge (`api-bridge.js`), and the Supabase backend service (`inventoryService.js`), fully supporting CRUD for products.
- **Code Quality & Maintainability (10 pts)**: The codebase is well-organized with clear naming conventions, separation of concerns (frontend assets, backend API, distinct page views), and consistent formatting across JS and CSS modules.
- **Database Integration Quality (10 pts)**: Fully integrated with Supabase. Efficient `select`, `insert`, `update`, and `delete` queries handle core data securely, utilizing database constraints and ensuring state integrity. 
- **Input Validation & Security (10 pts)**: The solution validates required fields, properly converts data types (Numbers via `parseFloat`/`parseInt`), rejects empty mandatory submissions, handles default fallback states for invalid numeric inputs, and securely queries without dangerous concatenations via Supabase JS policies.
- **Testing Summary Report (15 pts)**: Comprehensive testing strategies, manual E2E workflows, and findings are documented in the **Testing Summary Report** (located in the `docs/` folder).
- **Final Demo Video (15 pts)**: [Insert Final Demo Video Link Here] (Walks through the application workflow, architecture overview, and testing highlights in under 7 minutes).
- **Project Tracking & Documentation (5 pts)**: Project features have been continually tracked via GitHub projects/Kanban. See the activity blog/reflective summary included with this submission for more details.

## Project Management

- **George Xie**: Implemented front-end UI components and logic, managed state, and integrated with Supabase backend.
- **Jibin Im**: Designed and implemented the Supabase backend, including database schema, API endpoints, logic models, and testing summary.
- **Calvin Nguyen**: Worked on front-end UI tracking, project tracking coordination, and demo testing.
