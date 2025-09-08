import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TransactionRow } from "./TransactionRow";
import { Button } from "@/components/ui/button";

export function TransactionTable({ transactions, hasMore, loading, loadMore }) {
  return (
    <section className="w-full backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto p-6">
        <Card className="p-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead># Block</TableHead>
                <TableHead>TxHash</TableHead>
                <TableHead>Games</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>TxCount</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <td colSpan={7} className="text-center py-3 text-gray-500">No activity</td>
                </TableRow>
              ) : (
                transactions.map((tx, index) => <TransactionRow key={tx.hash} tx={tx} index={index} />)
              )}
            </TableBody>
          </Table>

          {hasMore && (
            <div className="flex justify-center mt-4">
              <Button disabled={loading} onClick={loadMore}>
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
