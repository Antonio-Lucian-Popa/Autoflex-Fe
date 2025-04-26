import { Car, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-[1440px] py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-6 w-6" />
              <span className="text-xl font-bold">AutoFlex</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Platformă de închiriere și test-drive de mașini între persoane fizice
            </p>
            <div className="flex gap-4 mt-6">
              {/* Aici folosim normal <a> pentru link-uri externe */}
              <a href="#" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platformă</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cars" className="text-muted-foreground hover:text-foreground">
                  Caută mașini
                </Link>
              </li>
              <li>
                <Link to="/offer" className="text-muted-foreground hover:text-foreground">
                  Oferă mașina ta
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  Cum funcționează
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Companie</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  Despre noi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  Termeni și condiții
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Politica de confidențialitate
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground">
                  Politica de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AutoFlex. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
