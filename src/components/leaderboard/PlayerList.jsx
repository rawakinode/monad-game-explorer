import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Avatar from "boring-avatars"
import { useLeaderboardPlayers } from "@/hooks/useLeaderboardPlayers"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import PlayerName from "./PlayerName"

function PlayerList() {
    const { players, loading, hasMore, fetchPlayers } = useLeaderboardPlayers()

    useEffect(() => {
        fetchPlayers(false) // pertama kali load
    }, [])

    return (
        <div className="w-full mx-auto p-6">
            <div className="flex flex-col gap-4">
                {players.map((player, i) => (
                    <motion.div
                        key={player.playerAddress}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        <Card className="flex items-center justify-between gap-4 p-4">
                            <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-4">
                                {/* Avatar + Info */}
                                <div className="flex items-start gap-4 flex-1">
                                    <Avatar
                                        size={30}
                                        name={player.playerAddress}
                                        variant="marble"
                                        className="shrink-0 self-center"
                                    />
                                    <div>
                                        <h2 className="text-base font-medium text-left">
                                            <PlayerName player={player} />
                                        </h2>
                                    </div>
                                </div>

                                {/* Statistik */}
                                <div className="grid grid-cols-4 gap-6 text-center md:text-right text-sm w-full md:w-auto order-2 md:order-1">
                                    <div className="w-full lg:w-[80px]">
                                        <p className="text-gray-500">Games</p>
                                        <p className="font-semibold text-base">{player.gamesCount}</p>
                                    </div>
                                    <div className="w-full lg:w-[50]">
                                        <p className="text-gray-500">Gameplays</p>
                                        <p className="font-semibold text-base">{player.totalGameplay}</p>
                                    </div>
                                    <div className="w-full lg:w-[130]">
                                        <p className="text-gray-500">High Score</p>
                                        <p className="font-semibold text-base">
                                            {String(player.topScore).length > 8
                                                ? String(player.topScore).slice(0, 8) + "..."
                                                : player.topScore}
                                        </p>
                                    </div>
                                    <div className="w-full lg:w-[150]">
                                        <p className="text-gray-500">Top AccumulativeScore</p>
                                        <p className="font-semibold text-base">
                                            {String(player.accumulativeScore).length > 8
                                                ? String(player.accumulativeScore).slice(0, 8) + "..."
                                                : player.accumulativeScore}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}

                {/* Tombol Load More */}
                {hasMore && (
                    <div className="flex justify-center mt-4">
                        <Button onClick={() => fetchPlayers(true)} disabled={loading}>
                            {loading ? "Loading..." : "Load More"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlayerList
