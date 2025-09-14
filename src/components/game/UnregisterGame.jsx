import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import abi from "../../constants/abi.json";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";

function UnregisterGame() {
  const contractAddress = "0xceCBFF203C8B6044F52CE23D914A1bfD997541A4";
  const { address: walletAddress, isConnected } = useAccount();

  const [txHash, setTxHash] = useState(null);
  const [status, setStatus] = useState("idle"); 
  // idle | confirming | waiting | success | error

  const { writeContractAsync } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // update otomatis kalau tx sudah confirmed
  if (status === "waiting" && isConfirmed && status !== "success") {
    setStatus("success");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus("confirming");
      const hash = await writeContractAsync({
        address: contractAddress,
        abi,
        functionName: "unregisterGame",
        args: [walletAddress],
      });
      setTxHash(hash);
      setStatus("waiting");
    } catch (err) {
      console.error("Unregister error:", err);
      setStatus("error");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Unregister Game
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to unregister your game?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your game on blockchain.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={status === "confirming" || status === "waiting"}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button 
              onClick={handleSubmit} 
              disabled={status === "confirming" || status === "waiting" || status === "success"}
            >
              {status === "idle" && "Confirm"}
              {status === "confirming" && "Confirming..."}
              {status === "waiting" && "Wait transaction confirmed..."}
              {status === "success" && "Success"}
              {status === "error" && "Retry"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UnregisterGame;
