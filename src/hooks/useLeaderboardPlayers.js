import { useState, useCallback } from "react"
import axios from "axios"
import { API_BASE } from "@/constants/api"

export function useLeaderboardPlayers() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastPlayerAddress, setLastPlayerAddress] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const LIMIT = 20

  const fetchPlayers = useCallback(
    async (isLoadMore = false) => {
      setLoading(true)
      try {
        const params = { limit: LIMIT }
        if (isLoadMore && lastPlayerAddress) params.start = lastPlayerAddress

        const res = await axios.get(`${API_BASE}/leaderboard_player`, { params })
        const data = res.data

        if (isLoadMore) {
          setPlayers((prev) => [...prev, ...data])
        } else {
          setPlayers(data)
        }

        if (data.length > 0) {
          setLastPlayerAddress(data[data.length - 1].playerAddress)
        }

        setHasMore(data.length === LIMIT)
      } catch (err) {
        console.error("Error fetching leaderboard players:", err)
      } finally {
        setLoading(false)
      }
    },
    [lastPlayerAddress]
  )

  return { players, loading, hasMore, fetchPlayers, setLastPlayerAddress }
}
