import { Button } from "@/components/ui/button";

export function Hero({ filterRef }) {
  return (
    <section className="w-full border-b border-border backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center p-16 text-center">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-sm">
          Monad Playscan
        </h1>
        <p className="text-md max-w-2xl mb-6 text-muted-foreground">
          Discover, track, and analyze onchain gaming activities powered by
          Monad Games ID. Explore transactions, player stats, and the latest
          updates from the Monad ecosystem.
        </p>
        <Button onClick={() => filterRef.current?.scrollIntoView({ behavior: "smooth" })}>
          Explore Activity
        </Button>
      </div>
    </section>
  );
}
