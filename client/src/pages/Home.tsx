import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Percent, Package2, Wallet } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            <h1 className="text-xl font-bold">Calculadora Financiera</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Herramientas de Cálculo Financiero</h2>
          <p className="text-muted-foreground">
            Suite de calculadoras financieras para ayudarte en tus decisiones económicas diarias
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Link href="/iva">
            <a className="block">
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Calculadora de IVA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Calcula rápidamente el IVA y el precio final de tus productos o servicios
                  </p>
                </CardContent>
              </Card>
            </a>
          </Link>

          <Link href="/ofertas">
            <a className="block">
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package2 className="h-5 w-5" />
                    Calculadora de Ofertas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Analiza ofertas tipo 3x2 o 2x1 para conocer el precio real por unidad
                  </p>
                </CardContent>
              </Card>
            </a>
          </Link>

          <Link href="/descuentos">
            <a className="block">
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    Calculadora de Descuentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Calcula el precio final después de aplicar descuentos porcentuales
                  </p>
                </CardContent>
              </Card>
            </a>
          </Link>

          <Link href="/financiacion">
            <a className="block">
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Calculadora de Financiación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Planifica tus pagos a plazos con o sin intereses
                  </p>
                </CardContent>
              </Card>
            </a>
          </Link>
        </div>
      </main>

      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Calculadora Financiera PWA - Todos los cálculos se realizan localmente en tu dispositivo
        </div>
      </footer>
    </div>
  );
}