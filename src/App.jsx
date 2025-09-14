import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react"

import Home from "@/pages/Home";
import Games from "@/pages/Games";
import Leaderboard from "./pages/Leaderboard";
import MyGame from "./pages/MyGame";
import AllGames from "./pages/AllGames";

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
            <Route path="/games/:address" element={<MyGame key={window.location.pathname} />} />
            <Route path="/allgames" element={<AllGames />} />
          </Routes>
        </main>

        <Footer />
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

export default App;
