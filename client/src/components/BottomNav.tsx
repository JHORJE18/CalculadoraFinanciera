import { Link, useLocation } from "wouter";
import { Calculator, Percent, Package2, Wallet, ArrowDownUp, History, Home as HomeIcon, TrendingUp, Landmark, BadgePercent } from "lucide-react";

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
    <nav className="fixed bottom-0 left-0 right-0 glass-surface border-t overflow-x-auto">
      <div className="flex items-center h-16 min-w-max px-2 gap-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location === path;
          return (
            <Link key={path} href={path}>
              <a
                className={`
                  relative flex flex-col items-center px-3 py-1.5 min-w-[56px] rounded-xl transition-all duration-200
                  ${isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-primary shadow-lg shadow-primary/40" />
                )}
                <Icon className="relative h-5 w-5" />
                <span className="relative text-xs mt-0.5 whitespace-nowrap font-medium">{label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
