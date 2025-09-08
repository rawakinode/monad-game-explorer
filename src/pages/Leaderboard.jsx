import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GameList from "@/components/leaderboard/GameList";
import PlayerList from "@/components/leaderboard/PlayerList";

function Leaderboard() {
    return (
        <>
            <section className="w-full border-b border-border backdrop-blur-md">
                <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center p-16 text-center">
                    <h1 className="text-4xl font-extrabold mb-6 drop-shadow-sm">
                        Top Leaderboard
                    </h1>
                    <p className="text-lg max-w-2xl mb-6 text-muted-foreground">
                        Discover the most played games and the highest scoring players.
                    </p>
                </div>
            </section>
            <section className="w-full backdrop-blur-md">
                <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center p-5 text-center">
                    <Tabs defaultValue="games" className="w-full">
                        <TabsList>
                            <TabsTrigger value="games">Games</TabsTrigger>
                            <TabsTrigger value="players">Players</TabsTrigger>
                        </TabsList>

                        <TabsContent value="games">
                            <GameList/>
                        </TabsContent>

                        <TabsContent value="players">
                            <PlayerList/>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </>
    );
}

export default Leaderboard;
