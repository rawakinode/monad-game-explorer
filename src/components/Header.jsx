import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-background shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        Playnad Explorer
      </div>

      <ModeToggle />

    </header>
  )
}

export default Header
