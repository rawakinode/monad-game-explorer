import { useUsername } from "@/hooks/useUsername";

function PlayerUsername({wallet}){
    const { username, loading } = useUsername(wallet);

    const displayName = username || "-";

    return (
        <span>
            {displayName}
        </span>
    )
}

export default PlayerUsername;