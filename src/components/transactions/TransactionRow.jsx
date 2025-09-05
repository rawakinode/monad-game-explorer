import { TableRow, TableCell } from "@/components/ui/table";
import { PlayerCell } from "@/components/PlayerCell";
import { timeAgo } from "@/utils/formatTime";

export function TransactionRow({ tx }) {
  return (
    <TableRow>
      <TableCell className="font-medium max-w-[100px]">{tx.block}</TableCell>
      <TableCell className="truncate max-w-[200px]">
        <a
          href={`https://testnet.monadexplorer.com/tx/${tx.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-2 decoration-dotted hover:opacity-80"
        >
          {tx.hash}
        </a>
      </TableCell>
      <TableCell>{tx.gameName}</TableCell>
      <TableCell><PlayerCell wallet={tx.playerAddress} /></TableCell>
      <TableCell>{tx.score}</TableCell>
      <TableCell>{tx.tx}</TableCell>
      <TableCell>{timeAgo(tx.timestamp)}</TableCell>
    </TableRow>
  );
}
