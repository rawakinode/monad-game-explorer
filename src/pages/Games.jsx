function Games() {
    return (
        <section className="w-full border-b border-border backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center p-16 text-center">
                <h1 className="text-4xl font-extrabold mb-6 drop-shadow-sm">
                    All Games
                </h1>
                <p className="text-lg max-w-2xl mb-6 text-muted-foreground">
                    Show all games registered on Monad Game ID.
                </p>
            </div>
        </section>
    );
}

export default Games;