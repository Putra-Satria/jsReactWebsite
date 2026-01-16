// main.jsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./components/ui/color-mode"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../utils/queryClient.js"
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider defaultTheme="dark" enableSystem={true}>
        <QueryClientProvider client={queryClient}>
          <Toaster
          position="top-center"
          containerStyle={{
            zIndex: 2000,   // IMPORTANT
          }}
        />
            <App />
        </QueryClientProvider>
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>
)
