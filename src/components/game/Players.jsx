import { TableRow, TableCell, Table, TableHeader, TableHead, TableBody } from "@/components/ui/table";
import { Card } from "@/components/ui/card"
import PlayerUsername from "./PlayerUsername";

function Players({ players }) {
    return (
        <Card className="p-3">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Player Address</TableHead>
                        <TableHead>Username</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {players.length === 0 ? (
                        <TableRow>
                            <td colSpan={7} className="text-center py-3 text-gray-500">No players</td>
                        </TableRow>
                    ) : (
                        players.map((p, index) =>
                            <TableRow key={p} className="text-left">
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <a
                                        href={`https://testnet.monadexplorer.com/address/${p}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground underline underline-offset-2 decoration-dotted hover:opacity-80"
                                    >
                                        {p}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <PlayerUsername wallet={p}/>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </Card>
    )
}

export default Players;