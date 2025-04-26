import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Car, LogIn, Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout, checkAuth } from "@/services/auth"; // schimbat corect
import { BASE_PATH } from "@/lib/constant";

export function Navbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { data: isAuthenticated } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleLogout = () => {
    logout();
    queryClient.setQueryData(['auth'], false);
    navigate(`${BASE_PATH}/`);
  };

  const handleAuthenticatedLink = (path: string) => {
    if (!isAuthenticated) {
      navigate(`${BASE_PATH}/login`);
      return;
    }
    navigate(`${BASE_PATH}/${path}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto max-w-[1440px] flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">AutoFlex</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between flex-1 pl-8">
          <div className="flex gap-6">
            <Link to="/cars" className="text-foreground/60 hover:text-foreground transition">
              Caută mașini
            </Link>
            {isAuthenticated && (
              <button
                onClick={() => handleAuthenticatedLink("offer")}
                className="text-foreground/60 hover:text-foreground transition"
              >
                Oferă mașina ta
              </button>
            )}
            <Link to="/how-it-works" className="text-foreground/60 hover:text-foreground transition">
              Cum funcționează
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profilul meu</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile/bookings">Rezervările mele</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile/cars">Mașinile mele</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Deconectare
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Autentificare
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Înregistrare</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-1 justify-end md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/cars" onClick={() => setIsOpen(false)}>
                  Caută mașini
                </Link>

                {isAuthenticated && (
                  <button
                    onClick={() => {
                      handleAuthenticatedLink("offer");
                      setIsOpen(false);
                    }}
                    className="text-left"
                  >
                    Oferă mașina ta
                  </button>
                )}

                <Link to="/how-it-works" onClick={() => setIsOpen(false)}>
                  Cum funcționează
                </Link>

                <hr className="my-4" />

                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      Profilul meu
                    </Link>
                    <Link to="/profile/bookings" onClick={() => setIsOpen(false)}>
                      Rezervările mele
                    </Link>
                    <Link to="/profile/cars" onClick={() => setIsOpen(false)}>
                      Mașinile mele
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      Deconectare
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <LogIn className="h-4 w-4 mr-2" />
                        Autentificare
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Înregistrare</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
