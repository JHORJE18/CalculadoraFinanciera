import { Link, useLocation } from "wouter";
import { Calculator, Percent, Package2, Wallet, Home } from "lucide-react";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: Calculator, label: "IVA", path: "/iva" },
    { icon: Package2, label: "Ofertas", path: "/ofertas" },
    { icon: Percent, label: "Descuentos", path: "/descuentos" },
    { icon: Wallet, label: "Financiación", path: "/financiacion" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link key={path} href={path}>
            <a
              className={`
                flex flex-col items-center p-2
                ${location === path
                  ? "text-primary font-medium dark:text-primary-foreground"
                  : "text-muted-foreground hover:text-primary dark:hover:text-primary-foreground"
                }
              `}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}