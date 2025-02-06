import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "./components/theme-provider";

// Páginas de calculadoras
import IvaPage from "@/pages/calculadoras/Iva";
import OfertasPage from "@/pages/calculadoras/Ofertas";
import DescuentosPage from "@/pages/calculadoras/Descuentos";
import FinanciacionPage from "@/pages/calculadoras/Financiacion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={IvaPage} />
      <Route path="/ofertas" component={OfertasPage} />
      <Route path="/descuentos" component={DescuentosPage} />
      <Route path="/financiacion" component={FinanciacionPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="calculator-theme">
        <Router />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;