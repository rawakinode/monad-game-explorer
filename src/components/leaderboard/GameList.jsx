import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2 } from "lucide-react"
import { motion } from "framer-motion"
import { useLeaderboardGames } from "@/hooks/useLeaderboardGames"
import GameImage from "./GameImage"

function GameList() {
    const { games, loading, hasMore, fetchGames } = useLeaderboardGames()

    useEffect(() => {
        fetchGames(false) // load pertama
    }, [])

    return (
        <div className="w-full mx-auto p-6">
            <div className="flex flex-col gap-4">
                {games.map((game, i) => (
                    <motion.div
                        key={game._id || game.gameAddress || i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                        <a
                            href={`/games/${game.gameAddress}`}
                            className="block no-underline"
                        >
                            <Card
                                className="flex items-center justify-between gap-4 p-4 
               transition-transform transform hover:scale-[1.02] 
               hover:shadow-lg hover:border-[var(--monad-color)] cursor-pointer"
                            >
                                <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-4">
                                    {/* Logo + Info */}
                                    <div className="flex items-start gap-4 flex-1">
                                        <GameImage
                                            src={game.gameImage}
                                            alt={game.gameName}
                                            className="w-12 h-12 rounded-xl shrink-0 self-center"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-lg font-bold text-left">
                                                    {game.gameName}
                                                </h2>
                                                {game.gameUrl && (
                                                    <a
                                                        href={
                                                            game.link?.startsWith("http")
                                                                ? game.gameUrl
                                                                : `https://${game.gameUrl}`
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:text-blue-700"
                                                        onClick={(e) => e.stopPropagation()} // supaya klik ikon ga trigger link Card utama
                                                    >
                                                        <Gamepad2 size={18} />
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-gray-500 text-sm text-left max-w-md line-clamp-2">
                                                {game.gameDescription || "No description"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Statistik */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left md:text-right text-sm w-full md:w-auto order-2 md:order-1">
                                        <div className="w-full md:w-[80px]">
                                            <p className="text-gray-500">Gameplays</p>
                                            <p className="font-semibold text-base truncate">
                                                {game.totalGameplay}
                                            </p>
                                        </div>
                                        <div className="w-full md:w-[50px]">
                                            <p className="text-gray-500">Players</p>
                                            <p className="font-semibold text-base truncate">
                                                {game.playersCount || 0}
                                            </p>
                                        </div>
                                        <div className="w-full md:w-[130px]">
                                            <p className="text-gray-500">Top Scores</p>
                                            <p className="font-semibold text-base truncate">
                                                {String(game.topScore).length > 8
                                                    ? String(game.topScore).slice(0, 12) + "..."
                                                    : game.topScore}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </a>

                    </motion.div>
                ))}
            </div>

            {/* Load More */}
            {hasMore && (
                <div className="flex justify-center mt-6">
                    <Button onClick={() => fetchGames(true)} disabled={loading}>
                        {loading ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default GameList
