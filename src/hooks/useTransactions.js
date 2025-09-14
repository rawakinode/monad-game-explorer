import { useState, useCallback } from "react";
import axios from "axios";
import { API_BASE } from "@/constants/api";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastHash, setLastHash] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = useCallback(async (filters = {}, isLoadMore = false) => {
    setLoading(true);
    try {
      const params = { ...filters };
      if (isLoadMore && lastHash) params.start = lastHash;

      const res = await axios.get(`${API_BASE}/transactions`, { params });
      const data = res.data;

      if (isLoadMore) {
        setTransactions((prev) => [...prev, ...data]);
      } else {
        setTransactions(data);
      }

      if (data.length > 0) {
        setLastHash(data[data.length - 1].hash);
      }
      setHasMore(data.length === 20);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  }, [lastHash]);


  return { transactions, loading, hasMore, fetchTransactions, setLastHash };
}
