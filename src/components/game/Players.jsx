import { useState } from "react";
import { TableRow, TableCell, Table, TableHeader, TableHead, TableBody } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import PlayerUsername from "./PlayerUsername";

function Players({ players }) {
  const [sortBy, setSortBy] = useState("0"); // default rank by Accumulative

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortBy === "0") {
      // Rank by Top Score (Accumulative)
      return b.scoreAccumulativeTotal - a.scoreAccumulativeTotal;
    } else {
      // Rank by High Score
      return b.topScore - a.topScore;
    }
  });

  return (
    <>
      <Select onValueChange={(val) => setSortBy(val)} className="mb-8">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Rank by Top Score (Accumulative)" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          <SelectItem value="0">Rank by Top Score (Accumulative)</SelectItem>
          <SelectItem value="1">Rank by High Score</SelectItem>
        </SelectContent>
      </Select>

      <Card className="p-3 mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Player Address</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Gameplay</TableHead>
              <TableHead>High Score</TableHead>
              <TableHead>Top Score (Accumulative)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-3 text-gray-500">
                  No players
                </TableCell>
              </TableRow>
            ) : (
              sortedPlayers.map((p, index) => (
                <TableRow key={p.playerAddress} className="text-left">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <a
                      href={`https://testnet.monadexplorer.com/address/${p.playerAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-2 decoration-dotted hover:opacity-80"
                    >
                      {p.playerAddress}
                    </a>
                  </TableCell>
                  <TableCell>
                    <PlayerUsername wallet={p.playerAddress} />
                  </TableCell>
                  <TableCell>{p.totalGameplay}</TableCell>
                  <TableCell>{p.topScore}</TableCell>
                  <TableCell>{p.scoreAccumulativeTotal}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export default Players;
