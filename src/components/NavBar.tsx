
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Droplet, LogIn, UserPlus, User, History, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if user is logged in (mock for now)
  const isLoggedIn = false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: "Home", path: "/", icon: <Droplet className="w-4 h-4 mr-2" /> },
    ...(isLoggedIn 
      ? [
          { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
          { name: "Profile", path: "/profile", icon: <User className="w-4 h-4 mr-2" /> },
          { name: "History", path: "/donation-history", icon: <History className="w-4 h-4 mr-2" /> },
        ] 
      : [
          { name: "Login", path: "/login", icon: <LogIn className="w-4 h-4 mr-2" /> },
          { name: "Register", path: "/register", icon: <UserPlus className="w-4 h-4 mr-2" /> },
        ]
    ),
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md py-3 shadow-sm" 
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <Droplet className="h-8 w-8 text-blood animate-pulse-subtle" />
          <span className="text-xl font-semibold">RedConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors",
                location.pathname === link.path
                  ? "text-blood"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          {location.pathname !== "/donation-form" && (
            <Button
              variant="default" 
              size="sm"
              className="animate-pulse-subtle"
              asChild
            >
              <Link to="/donation-form">Donate Now</Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md animate-fade-in">
          <div className="flex flex-col space-y-4 px-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center py-2 text-base font-medium transition-colors",
                  location.pathname === link.path
                    ? "text-blood"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={closeMenu}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            {location.pathname !== "/donation-form" && (
              <Button
                variant="default"
                className="w-full mt-2"
                asChild
              >
                <Link to="/donation-form" onClick={closeMenu}>Donate Now</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
