import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import GameImage from "@/components/leaderboard/GameImage"
import Players from "@/components/game/Players";
import RegisterGame from "@/components/game/RegisterGame";
import GameNotFound from "@/components/game/GameNotFound";
import UnregisterGame from "@/components/game/UnregisterGame";

import { TransactionTable } from "@/components/transactions/TransactionTable";
import { Wallet2, Gamepad2, Clock, Trophy, Users } from "lucide-react"

import { useGame } from "@/hooks/useGame";
import { useTransactions } from "@/hooks/useTransactions";
import { useAccount } from "wagmi"


function MyGame() {

    const { address } = useParams();
    const { address: walletAddress, isConnected } = useAccount();
    const { gameDetails, loading: isLoading } = useGame(address);

    const { transactions, loading, hasMore, fetchTransactions, setLastHash } = useTransactions();
    const [selectedGame, setSelectedGame] = useState("");
    const [player, setPlayer] = useState("");

    useEffect(() => {
        fetchTransactions(
            {
                game: address,
                ...(player ? { player } : {}),
            },
            false
        );
    }, [selectedGame, player, address]);

    if (isLoading) return <p>Loading...</p>;

    if (!isLoading && !gameDetails) {
        if (address == walletAddress) {
            return <RegisterGame />
        }
        return <GameNotFound />
    };

    return (
        <>
            {/* Game Profile Card */}
            <section className="w-full">
                <div className="max-w-[1200px] mx-auto p-6 space-y-6">

                    {/* Header Game Profile */}
                    <Card className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 p-6">

                        {/* Kiri: logo + deskripsi */}
                        <div className="flex items-start gap-6">
                            <GameImage
                                src={gameDetails.gameImage}
                                alt={gameDetails.gameName}
                                className="w-20 h-20 rounded-xl shrink-0 self-center"
                            />
                            <div className="text-left">
                                <h1 className="text-2xl font-bold">{gameDetails.gameName}</h1>
                                <p className="max-w-[500px] text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                                    {gameDetails.gameDescription || 'No description.'}
                                </p>
                                <div className="flex items-center gap-2 mt-4">
                                    <Wallet2 className="w-3 h-3" />
                                    <span className="text-xs text-gray-500 break-all">
                                        <a
                                            href={`https://testnet.monadexplorer.com/address/${address}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-foreground underline underline-offset-2 decoration-dotted hover:opacity-80"
                                        >
                                            {address}
                                        </a>

                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <a
                                        href={gameDetails.link?.startsWith("http") ? gameDetails.link : `https://${gameDetails.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="outline" size="sm">
                                            <Gamepad2 /> Play Now
                                        </Button>
                                        
                                    </a>
                                    {/* <UnregisterGame /> */}
                                </div>
                            </div>
                        </div>

                        {/* Statistik */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center w-full md:w-auto">
                            <div className="flex flex-col items-center">
                                <Gamepad2 className="w-5 h-5 text-blue-500 mb-1" />
                                <p className="text-lg font-bold">{gameDetails.totalGameplay}</p>
                                <p className="text-xs text-gray-500">Total Gameplay</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Users className="w-5 h-5 text-purple-500 mb-1" />
                                <p className="text-lg font-bold">{gameDetails.players.length}</p>
                                <p className="text-xs text-gray-500">Total Players</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Trophy className="w-5 h-5 text-yellow-500 mb-1" />
                                <p className="text-lg font-bold">{gameDetails.topScore}</p>
                                <p className="text-xs text-gray-500">Top Score</p>
                            </div>

                        </div>

                    </Card>
                </div>
            </section>

            <section className="w-full">
                <div className="max-w-[1200px] mx-auto">
                    <Tabs defaultValue="games" className="w-full">
                        <TabsList className="ml-5">
                            <TabsTrigger value="games">Last Activity</TabsTrigger>
                            <TabsTrigger value="players">Players</TabsTrigger>
                        </TabsList>

                        <TabsContent value="games">
                            <TransactionTable transactions={transactions} hasMore={hasMore} loading={loading} loadMore={() => fetchTransactions({ game: address, player }, true)} />
                        </TabsContent>

                        <TabsContent value="players">
                            <div className="max-w-[1200px] mx-auto p-6 text-center">
                                <Players players={gameDetails.players} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </>
    )
}

export default MyGame
