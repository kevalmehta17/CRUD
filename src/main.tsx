import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import {Provider} from "react-redux";
import { store } from "./store/UserStore.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </Provider>
  </StrictMode>
)



// I am building a React CRUD application and I want structured, step-by-step guidance (NOT full code unless I ask).

// Tech stack:

// * React with TypeScript
// * Redux Toolkit for global state management
// * Tailwind CSS for styling
// * shadcn/ui for UI components

// Project requirements:

// * Fetch data from a REST API (MockAPI)
// * Display data in a table
// * Implement client-side pagination (page size options: 10, 20, 30, 50)
// * Implement search functionality (filter by multiple fields like name, city, etc.)
// * Implement Create, Edit, Delete (real API calls)
// * Handle form state properly for create/edit
// * Use debouncing for search input
// * Maintain clean separation between:

//   * Server state (API data)
//   * UI state (pagination, search, selection)
//   * Derived state (filtered + paginated data)

// Important constraints:

// * Do NOT mix UI logic and business logic
// * Do NOT store derived state in Redux
// * Keep components small and reusable
// * Prefer explaining logic before code
// * Highlight common mistakes and edge cases

// My API:
// https://69bb87d60915748735b967b4.mockapi.io/api

// Data shape (normalized in frontend):
// {
// id: string;
// name: string;
// city: string;
// country: string;
// state: string;
// }

// Current progress:
// [REPLACE THIS WITH YOUR CURRENT STEP — e.g., “Redux setup done, starting API integration”]

// What I want now:
// [ASK A SPECIFIC QUESTION — e.g., “Help me design the Redux slice structure”]
