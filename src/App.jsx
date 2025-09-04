import { useEffect, useState, useRef } from "react"
import axios from "axios"

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

import { PlayerCell } from "./components/PlayerCell"
import { timeAgo } from "./utils/formatTime"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const API_BASE = "https://monad-game-explorer-api.vercel.app"

function App() {
  const [games, setGames] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // filters
  const [selectedGame, setSelectedGame] = useState("")
  const [player, setPlayer] = useState("")
  const [lastHash, setLastHash] = useState(null)

  const filterRef = useRef(null)

  // ambil daftar game
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${API_BASE}/games`)
        setGames(res.data)
      } catch (err) {
        console.error("Error fetching games:", err)
      }
    }
    fetchGames()
  }, [])

  // ambil transaksi
  const fetchTransactions = async (isLoadMore = false) => {
    setLoading(true)
    try {
      const params = {}
      if (selectedGame && selectedGame !== "all") {
        params.game = selectedGame
      }
      if (player) params.player = player
      if (isLoadMore && lastHash) params.start = lastHash

      const res = await axios.get(`${API_BASE}/transactions`, { params })
      const data = res.data

      if (isLoadMore) {
        setTransactions((prev) => [...prev, ...data])
      } else {
        setTransactions(data)
      }

      // update lastHash untuk pagination
      if (data.length > 0) {
        setLastHash(data[data.length - 1].hash)
      }

      // cek apakah masih ada data untuk load more
      setHasMore(data.length === 20)
    } catch (err) {
      console.error("Error fetching transactions:", err)
    } finally {
      setLoading(false)
    }
  }

  // fetch awal
  useEffect(() => {
    fetchTransactions(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame, player])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="w-full border-b border-border backdrop-blur-md bg-background">
          <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">
            <div className="text-m font-bold">Monad Games EX</div>
            <ModeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <section className="w-full border-b border-border backdrop-blur-md">
          <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center p-16 text-center">
            <h1 className="text-5xl font-extrabold mb-6 drop-shadow-sm">
              Monad Games ID Explorer
            </h1>
            <p className="text-lg max-w-2xl mb-6 text-muted-foreground">
              Discover, track, and analyze onchain gaming activities powered by
              Monad Games ID. Explore transactions, player stats, and the latest
              updates from the Monad Gaming ID ecosystem.
            </p>
            <Button
              onClick={() => {
                filterRef.current?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Start Explore
            </Button>
          </div>
        </section>

        {/* Filter Section */}

        <section className="w-full border-b border-border backdrop-blur-md " ref={filterRef}>
          <div className="max-w-[1200px] mx-auto p-6 flex gap-4 justify-center">
            {/* Game Select */}
            <Select onValueChange={(val) => setSelectedGame(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Games" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <SelectItem value="all">All Games</SelectItem>
                {games.map((game) => (
                  <SelectItem key={game.gameAddress} value={game.gameAddress}>
                    {game.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Player Input */}
            {/* <Input
              type="text"
              placeholder="Game address / player"
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
            /> */}
            <Button
              onClick={() => {
                setLastHash(null)   // reset pagination
                fetchTransactions(false)
              }}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </Button>

          </div>
        </section>

        {/* Table/List Section */}
        <section className="w-full backdrop-blur-md ">
          <div className="max-w-[1200px] mx-auto p-6">
            <Card className="p-3">
              <Table>
                {/* <TableCaption>Games transaction activity.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead># Block</TableHead>
                    <TableHead>TxHash</TableHead>
                    <TableHead>Games</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>TxCount</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-3 text-gray-500"
                      >
                        No activity
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map((tx) => (
                      <TableRow key={tx.hash}>
                        <TableCell className="font-medium max-w-[100px]">{tx.block}</TableCell>
                        <TableCell className="truncate max-w-[200px]">
                          <a
                            href={`https://testnet.monadexplorer.com/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground underline underline-offset-2 decoration-dotted hover:opacity-80"
                          >
                            {tx.hash}
                          </a>
                        </TableCell>
                        <TableCell>{tx.gameName}</TableCell>
                        <TableCell>
                          <PlayerCell wallet={tx.playerAddress} />
                        </TableCell>
                        <TableCell>{tx.score}</TableCell>
                        <TableCell>{tx.tx}</TableCell>
                        <TableCell>{timeAgo(tx.timestamp)}</TableCell>
                      </TableRow>
                    ))
                  )}

                </TableBody>
              </Table>

              {/* Load More */}
              <div className="flex justify-center mt-4">
                {hasMore && (
                  <Button disabled={loading} onClick={() => fetchTransactions(true)}>
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-border mt-auto backdrop-blur-md ">
          <div className="max-w-[1200px] mx-auto p-4 text-center">
            Created by Rawakinode © 2025 Monad Games Explorer
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
