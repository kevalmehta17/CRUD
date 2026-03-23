import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import {Provider} from "react-redux";
import { store } from "./store/UserStore.tsx"
import { Toaster } from  "@/components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider>
      <App />
      <Toaster position="top-right" richColors />
    </ThemeProvider>
    </Provider>
  </StrictMode>
)




