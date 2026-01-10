import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full py-6 px-6 border-t border-border">
      <nav className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <Link to="/about" className="hover:text-foreground transition-colors">
          Over Ons
        </Link>
        <Link to="/help" className="hover:text-foreground transition-colors">
          Help Gids
        </Link>
        <Link to="/contact" className="hover:text-foreground transition-colors">
          Contact
        </Link>
        <Link to="/privacy" className="hover:text-foreground transition-colors">
          Privacybeleid
        </Link>
      </nav>
    </footer>
  );
}
