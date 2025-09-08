import { useUsername } from "@/hooks/useUsername"
import { Skeleton } from "@/components/ui/skeleton"

function PlayerName({ player }) {
  const { username, loading } = useUsername(player.playerAddress)

  const formatAddress = (addr) => {
    if (!addr) return "Unknown"
    return addr.slice(0, 10) + "...." + addr.slice(-10)
  }

  if (loading) {
    return <Skeleton className="h-[20px] w-[120px] rounded-full" />
  }

  return (
    <span>
      {username || formatAddress(player.playerAddress)}
    </span>
  )
}

export default PlayerName
