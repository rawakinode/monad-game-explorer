import { useState } from "react"

function GameImage({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState(src || "/monad.svg")

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc("/monad.svg")}
    />
  )
}

export default GameImage
