import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "@/constants/api";

export function useGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${API_BASE}/games`);
        setGames(res.data);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };
    fetchGames();
  }, []);

  return games;
}
