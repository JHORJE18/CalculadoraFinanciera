import useCalculationHistory, { CalculationType } from "@/hooks/use-calculation-history";
import { BottomNav } from "@/components/BottomNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { History, Trash2 } from "lucide-react";

const TYPE_LABELS: Record<CalculationType, string> = {
  vat: "IVA",
  discount: "Descuento",
  offer: "Oferta",
  financing: "Financiación",
  currency: "Divisas",
  mortgage: "Hipoteca",
  margin: "Margen",
  salary: "Nómina",
};

function formatResult(type: CalculationType, result: Record<string, any>): string {
  switch (type) {
    case "vat":
      return `Total: ${Number(result.total).toFixed(2)}€`;
    case "discount":
      return `Precio final: ${Number(result.finalPrice).toFixed(2)}€`;
    case "offer":
      return `Precio c/oferta: ${Number(result.finalPricePerUnit).toFixed(2)}€/ud`;
    case "financing":
      return `Cuota: ${Number(result.monthlyPayment).toFixed(2)}€/mes`;
    case "currency":
      return `Resultado: ${Number(result.result).toFixed(2)}`;
    case "mortgage":
      return `Cuota: ${Number(result.monthlyPayment).toFixed(2)}€/mes`;
    case "margin":
      return `Margen: ${Number(result.marginPercent).toFixed(2)}%`;
    case "salary":
      return `Neto: ${Number(result.netMonthly).toFixed(2)}€/mes`;
    default:
      return "";
  }
}

export default function HistorialPage() {
  const { history, clearHistory } = useCalculationHistory();

  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <History className="h-6 w-6" />
            <h1 className="text-xl font-bold">Historial</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-4">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <History className="h-12 w-12 opacity-30" />
            <p className="text-sm">No hay cálculos guardados todavía.</p>
            <p className="text-xs">Usa cualquier calculadora para que aparezcan aquí.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={clearHistory} className="gap-2 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950">
                <Trash2 className="h-4 w-4" />
                Limpiar historial
              </Button>
            </div>
            {history.map((record) => (
              <Card key={record.id}>
                <CardContent className="py-3 px-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{TYPE_LABELS[record.type] ?? record.type}</p>
                    <p className="text-xs text-muted-foreground">{formatResult(record.type, record.result)}</p>
                  </div>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {formatter.format(new Date(record.timestamp))}
                  </p>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
