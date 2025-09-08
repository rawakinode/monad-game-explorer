import { useState, useCallback } from "react"
import axios from "axios"
import { API_BASE } from "@/constants/api"

export function useLeaderboardGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastGameAddress, setLastGameAddress] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const LIMIT = 20

  const fetchGames = useCallback(
    async (isLoadMore = false) => {
      setLoading(true)
      try {
        const params = { limit: LIMIT }
        if (isLoadMore && lastGameAddress) params.start = lastGameAddress

        const res = await axios.get(`${API_BASE}/leaderboard_games`, { params })
        const data = res.data

        if (isLoadMore) {
          setGames((prev) => [...prev, ...data])
        } else {
          setGames(data)
        }

        if (data.length > 0) {
          setLastGameAddress(data[data.length - 1].gameAddress)
        }

        setHasMore(data.length === LIMIT)
      } catch (err) {
        console.error("Error fetching leaderboard games:", err)
      } finally {
        setLoading(false)
      }
    },
    [lastGameAddress]
  )

  return { games, loading, hasMore, fetchGames, setLastGameAddress }
}
