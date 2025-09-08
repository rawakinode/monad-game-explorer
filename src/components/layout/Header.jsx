import { ModeToggle } from "@/components/mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { Menu, Home, Trophy, Gamepad2 } from "lucide-react";

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

export function Header() {
  const location = useLocation();
  const menu = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <Trophy className="w-4 h-4" /> },
  ];

  return (
    <header className="w-full border-b border-border backdrop-blur-md bg-background">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">

        <div className="flex items-center gap-2 font-bold text-lg">
          <Gamepad2 className="w-6 h-6" />
          Monad Playscan
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
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
          <ModeToggle />
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
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
              <ModeToggle />
            </SheetContent>
          </Sheet>
        </div>


      </div>
    </header>
  );
}
