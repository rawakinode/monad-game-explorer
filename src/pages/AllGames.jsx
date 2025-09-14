import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GameList from "@/components/leaderboard/GameList";
import PlayerList from "@/components/leaderboard/PlayerList";

function AllGames() {
    return (
        <>
            <section className="w-full border-b border-border backdrop-blur-md">
                <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center p-16 text-center">
                    <h1 className="text-4xl font-extrabold mb-6 drop-shadow-sm">
                        All Games
                    </h1>
                    <p className="text-lg max-w-2xl mb-6 text-muted-foreground">
                        Browse and explore Monad blockchain games. Track gameplay stats, scores, and find your next challenge.
                    </p>
                </div>
            </section>
            <section className="w-full backdrop-blur-md">
                <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center p-5 text-center">
                    
                </div>
            </section>
        </>
    );
}

export default AllGames;
