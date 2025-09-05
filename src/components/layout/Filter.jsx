import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function Filter({ games, setSelectedGame, refresh, loading, filterRef }) {
  return (
    <section className="w-full border-b border-border backdrop-blur-md" ref={filterRef}>
      <div className="max-w-[1200px] mx-auto p-6 flex gap-4 justify-center">
        <Select onValueChange={(val) => setSelectedGame(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Games" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            <SelectItem value="all">All Games</SelectItem>
            {games.map((game) => (
              <SelectItem key={game.gameAddress} value={game.gameAddress}>
                {game.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={refresh} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
    </section>
  );
}
