import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "@/constants/api";

export function useGame(address) {
  const [gameDetails, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const fetchGame = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/game?address=${address}`);
        setGame(res.data);
      } catch (err) {
        console.error("Error fetching game:", err);
        setGame(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [address]);

  return { gameDetails, loading };
}
