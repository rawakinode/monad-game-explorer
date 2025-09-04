# 🎮 Monad Games ID Explorer

**Monad Games ID Explorer** is a React + Vite based application to explore
on-chain gaming activities in the Monad ecosystem.\
This project provides a real-time view of game transactions, players,
and scores, making it easier to track on-chain gaming activity.

------------------------------------------------------------------------

## ✨ Features

-   🔎 **Explore Transactions:** View game activity transactions on the
    Monad network.
-   🎮 **Game Filter:** Filter transactions by specific games.
-   👤 **Player Lookup:** Check player by wallet address or username.
-   ⛓️ **Tx & Address Links:** Each hash & address links directly to
    [Monad Explorer](https://testnet.monadexplorer.com).

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   ⚛️ React + Vite
-   🎨 TailwindCSS
-   🌐 Axios (for API requests)
-   🔗 API:
    -   `https://monad-game-explorer-api.vercel.app` → transactions &
        games
    -   `https://monad-games-id-site.vercel.app/api/check-wallet?wallet=...`
        → username validation

------------------------------------------------------------------------

## 🚀 Getting Started

1.  Clone repository:

    ``` bash
    git clone https://github.com/username/monad-games-explorer.git
    cd monad-games-explorer
    ```

2.  Install dependencies:

    ``` bash
    npm install
    ```

3.  Run development server:

    ``` bash
    npm run dev
    ```

4.  Open in browser:

        http://localhost:5173

------------------------------------------------------------------------

## 🔧 Configuration

-   Ensure the **Monad Games Explorer API** is running:\
    `https://monad-game-explorer-api.vercel.app`\

-   Update API base in `App.jsx` if needed:

    ``` js
    const API_BASE = "https://monad-game-explorer-api.vercel.app"
    ```


------------------------------------------------------------------------

## 📜 License

MIT License © 2025 Rawakinode
