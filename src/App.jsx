import { useRef, useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";

import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Filter } from "@/components/layout/Filter";
import { Footer } from "@/components/layout/Footer";
import { TransactionTable } from "@/components/transactions/TransactionTable";

import { useGames } from "@/hooks/useGames";
import { useTransactions } from "@/hooks/useTransactions";

function App() {
  const filterRef = useRef(null);
  const games = useGames();

  const { transactions, loading, hasMore, fetchTransactions, setLastHash } = useTransactions();
  const [selectedGame, setSelectedGame] = useState("");
  const [player, setPlayer] = useState("");

  useEffect(() => {
    fetchTransactions(
      {
        ...(selectedGame && selectedGame !== "all" ? { game: selectedGame } : {}),
        ...(player ? { player } : {}),
      },
      false
    );
  }, [selectedGame, player]);

  const refresh = () => {
    setLastHash(null);
    fetchTransactions({ ...(selectedGame !== "all" ? { game: selectedGame } : {}), player });
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <Hero filterRef={filterRef} />
        <Filter games={games} setSelectedGame={setSelectedGame} refresh={refresh} loading={loading} filterRef={filterRef} />
        <TransactionTable transactions={transactions} hasMore={hasMore} loading={loading} loadMore={() => fetchTransactions({ game: selectedGame, player }, true)} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;