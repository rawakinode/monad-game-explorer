import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import Home from "@/pages/Home";
import Games from "@/pages/Games";
import Leaderboard from "./pages/Leaderboard";

import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        <Footer />
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

export default App;
