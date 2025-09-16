import { useEffect, useState } from "react"
import axios from "axios"
import { API_USERNAME } from "@/constants/api"

const usernameCache = {}

export function useUsername(wallet) {
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!wallet) return

    if (usernameCache[wallet]) {
      setUsername(usernameCache[wallet])
      setLoading(false)
      return
    }

    const fetchUsername = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `${API_USERNAME}/api/check-wallet?wallet=${wallet}`
        )
        if (res.data.hasUsername) {
          usernameCache[wallet] = res.data.user.username
          setUsername(res.data.user.username)
        } else {
          usernameCache[wallet] = null
        }
      } catch (err) {
        console.error("Error fetching username:", err)
        usernameCache[wallet] = null
      } finally {
        setLoading(false)
      }
    }

    fetchUsername()
  }, [wallet])

  return { username, loading }
}
