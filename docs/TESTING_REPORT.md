# Inventory Management System - Testing Summary Report

## 1. Clear Test Plan
Our primary objective during testing was to verify the reliability of the end-to-end workflow between the frontend client and the newly integrated Node.js Express server. We aimed to ensure that all CRUD (Create, Read, Update, Delete) operations interacted safely with the Supabase PostgreSQL database, and that unauthorized access was appropriately handled. 

Testing was done manually using standard client-side flows to emulate typical user behavior along with edge-case inputs to test the limits of our server-side validation.

## 2. Meaningful Test Cases & Results

| Test ID | Feature Tested | Action/Input | Expected Behavior | Actual Result / Status |
|---|---|---|---|---|
| **TC-01** | Authentication (Login) | Submit `manager@gmail.com` and `password` via Login portal. | The Node.js server queries Supabase, successfully validates the credentials, and redirects the user to the Inventory Dashboard. | **PASS** - Successfully redirected, returning `200 OK`. |
| **TC-02** | Auth Failure | Submit `admin@gmail.com` and `wrongpass` | Supabase returns 0 rows. Node.js backend throws a `401 Unauthorized` block. Frontend alert pops up. | **PASS** - Frontend correctly caught the error and prevented entry. |
| **TC-03** | Retrieve Data (Read) | Load the main Inventory Dashboard. | Fetch request is made to `/api/inventory`. Server responds with JSON array of product objects mapped correctly sequentially into the UI table. | **PASS** - Products list accurately matched the Supabase database rows. |
| **TC-04** | Form Validation (Input Security) | Attempt to add a new product with `price: -100` | The new strict server-side validation acts as a security net and throws a `400 Bad Request`. | **PASS** - Server prevented bad data insertion into the database. |
| **TC-05** | Deletion (Delete) | Click "Delete" on a successfully added product object. | Row is deleted successfully from Supabase without crashing the application state. Dashboard filters update cleanly. | **PASS** - The asynchronous `fetch` updated the UI seamlessly. |

## 3. Limitations
* **Authentication Tokens:** Currently, the system relies on simple credential lookups rather than persistent JWT-based session cookies. As a result, page refreshes may require users to re-authenticate depending on the specific flow.
* **Testing Scalability:** Automated testing suites (like Jest or Cypress) were not implemented, meaning edge cases are currently reliant exclusively on manual QA testing methods. Future milestones would greatly benefit from unit tests testing the Express routes synchronously. 
