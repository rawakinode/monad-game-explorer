import { ModeToggle } from "@/components/mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { Menu, Home, Trophy, Gamepad2, User, ListVideo } from "lucide-react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAccount } from "wagmi"

export function Header() {

  const { address, isConnected } = useAccount()
  const location = useLocation()

  // base menu
  const menu = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <Trophy className="w-4 h-4" /> },
  ]

  // tambahin My Game hanya jika wallet connect
  if (isConnected && address) {
    menu.push({
      name: "My Game",
      path: `/games/${address}`, // jangan lupa tambahin slash depan
      icon: <User className="w-4 h-4" />,
    })
  }


  return (
    <header className="w-full border-b border-border backdrop-blur-md bg-background">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <Gamepad2 className="w-6 h-6" />
          Monad Playscan
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 hover:opacity-80 ${location.pathname === item.path
                        ? "text-primary font-semibold"
                        : ""
                        }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Tools on right side */}
          <div className="flex items-center gap-3 ml-6">
            <ModeToggle />
            <div className="text-sm [&>button]:px-3 [&>button]:py-1 [&>button]:text-xs [&>button]:rounded-md">
              <ConnectButton label="Sign in" showBalance={false} chainStatus="icon" />
            </div>


          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          {/* Hamburger */}
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              <nav className="flex flex-col gap-4 mt-6">
                {menu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 text-lg ${location.pathname === item.path
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                      }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>

          <div className="text-sm [&>button]:px-3 [&>button]:py-1 [&>button]:text-xs [&>button]:rounded-md">
            <ConnectButton label="Sign in" showBalance={false} chainStatus="icon" />
          </div>
        </div>

      </div>
    </header>
  );
}
