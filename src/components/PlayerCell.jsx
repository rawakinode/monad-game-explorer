import { useUsername } from "../hooks/useUsername"
import { Skeleton } from "@/components/ui/skeleton"

export function PlayerCell({ wallet }) {
    const { username, loading } = useUsername(wallet)

    const formatAddress = (addr) => {
        if (!addr) return ""
        return addr.slice(0, 10) + "...." + addr.slice(-10)
    }

    const displayName = username || formatAddress(wallet)

    return (
        <a
            href={`https://testnet.monadexplorer.com/address/${wallet}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2 decoration-dotted hover:opacity-80"
        >
            {loading ? <Skeleton className="h-[20px] w-full rounded-full" /> : displayName}
        </a>
    )
}