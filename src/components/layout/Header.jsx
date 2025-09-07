import { ModeToggle } from "@/components/mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

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
    { name: "Home", path: "/" },
    { name: "Games", path: "/games" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <header className="w-full border-b border-border backdrop-blur-md bg-background">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">
        <div className="text-m font-bold">Monad Games EX</div>

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
                      className={`hover:opacity-80 ${
                        location.pathname === item.path
                          ? "text-primary font-semibold"
                          : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
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
                    className={`text-lg ${
                      location.pathname === item.path
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <ModeToggle />
      </div>
    </header>
  );
}
