import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="w-full border-b border-border backdrop-blur-md bg-background">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">
        <div className="text-m font-bold">Monad Games EX</div>
        <ModeToggle />
      </div>
    </header>
  );
}
