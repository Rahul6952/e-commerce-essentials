import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-xl font-semibold mb-4">ATELIER</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Timeless essentials crafted with intention. Quality materials, ethical production, lasting design.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3">
              {['New Arrivals', 'Bestsellers', 'Tops', 'Bottoms', 'Outerwear'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Sustainability', 'Careers', 'Press'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Help</h4>
            <ul className="space-y-3">
              {['FAQ', 'Shipping', 'Returns', 'Contact Us'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 ATELIER. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
