import { Link, useLocation } from "wouter";
import { Calculator, Percent, Package2, Wallet, Home, ArrowDownUp, History, Home as HomeIcon, TrendingUp, Landmark, BadgePercent } from "lucide-react";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: HomeIcon, label: "Inicio", path: "/" },
    { icon: Calculator, label: "IVA", path: "/iva" },
    { icon: Package2, label: "Ofertas", path: "/ofertas" },
    { icon: Percent, label: "Descuentos", path: "/descuentos" },
    { icon: Wallet, label: "Financiación", path: "/financiacion" },
    { icon: ArrowDownUp, label: "Divisas", path: "/divisas" },
    { icon: Landmark, label: "Hipoteca", path: "/hipoteca" },
    { icon: BadgePercent, label: "Margen", path: "/margen" },
    { icon: TrendingUp, label: "Nómina", path: "/nomina" },
    { icon: History, label: "Historial", path: "/historial" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background overflow-x-auto">
      <div className="flex items-center h-16 min-w-max px-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link key={path} href={path}>
            <a
              className={`
                flex flex-col items-center px-3 py-2 min-w-[56px]
                ${location === path
                  ? "text-primary font-medium dark:text-primary"
                  : "text-muted-foreground hover:text-primary dark:hover:text-primary"
                }
              `}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1 whitespace-nowrap">{label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
