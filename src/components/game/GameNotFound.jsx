import { Gamepad2 } from "lucide-react";

export default function GameNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center">
      <Gamepad2 className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Game Not Found</h2>
      <p className="text-gray-500 max-w-sm">
        The game you are looking for does not exist or the address is invalid.
      </p>
    </div>
  );
}
