import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Share2 } from "lucide-react";
import { useShare } from "@/hooks/useShare";
import useCalculationHistory from "@/hooks/use-calculation-history";
import { analytics } from "@/lib/analytics";

type SituacionPersonal = 'soltero' | 'casado' | 'familia_numerosa';
type NumPagas = '12' | '14';

/** Calcula la retención IRPF anual según escala progresiva española 2025.
 *  Aplica mínimo personal y reducción por rendimientos del trabajo.
 */
function calcularIRPF(baseIRPF: number, situacion: SituacionPersonal): number {
  // Reducción por rendimientos del trabajo (Art. 20 LIRPF)
  let reduccionTrabajo = 0;
  if (baseIRPF <= 13115) {
    reduccionTrabajo = 5565;
  } else if (baseIRPF <= 16825) {
    reduccionTrabajo = 5565 - 1.5 * (baseIRPF - 13115);
  } else {
    reduccionTrabajo = 0;
  }

  // Mínimo personal según situación
  const minimoPersonal: Record<SituacionPersonal, number> = {
    soltero: 5550,
    casado: 5550 + 2400, // mínimo conyugal simplificado
    familia_numerosa: 5550 + 4400, // incremento familia numerosa general
  };

  const baseImponible = Math.max(0, baseIRPF - reduccionTrabajo);
  const baseGravable = Math.max(0, baseImponible - minimoPersonal[situacion]);

  // Escala general IRPF 2025
  const tramos = [
    { hasta: 12450, tipo: 0.19 },
    { hasta: 20200, tipo: 0.24 },
    { hasta: 35200, tipo: 0.30 },
    { hasta: 60000, tipo: 0.37 },
    { hasta: 300000, tipo: 0.45 },
    { hasta: Infinity, tipo: 0.47 },
  ];

  let cuota = 0;
  let restante = baseGravable;
  let anterior = 0;

  for (const tramo of tramos) {
    if (restante <= 0) break;
    const trecho = Math.min(restante, tramo.hasta - anterior);
    cuota += trecho * tramo.tipo;
    restante -= trecho;
    anterior = tramo.hasta;
  }

  return Math.max(0, cuota);
}

export function NominaCalculator() {
  const { shareData } = useShare();
  const { addCalculation } = useCalculationHistory();

  const [grossAnnual, setGrossAnnual] = useState<string>(() => localStorage.getItem('nomina-gross') || '');
  const [numPagas, setNumPagas] = useState<NumPagas>(() => (localStorage.getItem('nomina-pagas') as NumPagas) || '14');
  const [situacion, setSituacion] = useState<SituacionPersonal>(() =>
    (localStorage.getItem('nomina-situacion') as SituacionPersonal) || 'soltero'
  );

  useEffect(() => {
    localStorage.setItem('nomina-gross', grossAnnual);
    localStorage.setItem('nomina-pagas', numPagas);
    localStorage.setItem('nomina-situacion', situacion);
  }, [grossAnnual, numPagas, situacion]);

  const brutoAnual = Number(grossAnnual) || 0;

  // Cotización Seguridad Social trabajador (% sobre base de cotización ≈ bruto)
  const SS_PCT = 6.47; // contingencias 4.7 + desempleo 1.55 + FP 0.1 + FOGASA 0.02 + MEI 0.1
  const cuotaSS = brutoAnual * (SS_PCT / 100);

  // Base IRPF
  const baseIRPF = Math.max(0, brutoAnual - cuotaSS);
  const cuotaIRPF = calcularIRPF(baseIRPF, situacion);
  const tipoEfectivoIRPF = brutoAnual > 0 ? (cuotaIRPF / brutoAnual) * 100 : 0;

  const netoAnual = brutoAnual - cuotaSS - cuotaIRPF;
  const pagas = Number(numPagas);
  const netoPaga = pagas > 0 ? netoAnual / pagas : 0;
  const brutoMensual = brutoAnual / 12;

  const handleShare = () => {
    const shareText = `💼 Cálculo de Nómina\n\nSalario bruto anual: ${brutoAnual.toFixed(2)}€\nN.º pagas: ${numPagas} | Situación: ${situacion}\nRetención SS (${SS_PCT}%): ${cuotaSS.toFixed(2)}€\nRetención IRPF (${tipoEfectivoIRPF.toFixed(1)}%): ${cuotaIRPF.toFixed(2)}€\nNeto anual: ${netoAnual.toFixed(2)}€\nNeto por paga: ${netoPaga.toFixed(2)}€\n\n📱 Calculado con Calculadora Financiera | ${window.location.href}`;

    shareData({ title: "Cálculo de Nómina", text: shareText });
    addCalculation('salary', { grossAnnual, numPagas, situacion }, { netMonthly: netoPaga, netoAnual, tipoEfectivoIRPF });
    analytics.trackShare('share', 'nomina_calculation');
    analytics.trackCalculation('nomina', {
      bruto_anual: brutoAnual,
      num_pagas: pagas,
      tipo_irpf: tipoEfectivoIRPF,
      neto_anual: netoAnual,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calculadora de Nómina</CardTitle>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nm-gross">Salario bruto anual (€)</Label>
          <Input
            id="nm-gross"
            type="number"
            min="0"
            step="100"
            value={grossAnnual}
            onChange={(e) => setGrossAnnual(e.target.value.replace(/,/g, '.'))}
            placeholder="Introduce el salario bruto anual"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Número de pagas</Label>
            <Select value={numPagas} onValueChange={(v) => setNumPagas(v as NumPagas)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 pagas</SelectItem>
                <SelectItem value="14">14 pagas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Situación personal</Label>
            <Select value={situacion} onValueChange={(v) => setSituacion(v as SituacionPersonal)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soltero">Soltero/a</SelectItem>
                <SelectItem value="casado">Casado/a</SelectItem>
                <SelectItem value="familia_numerosa">Familia numerosa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4 space-y-2 border-t">
          <div className="flex justify-between text-sm">
            <span>Bruto mensual:</span>
            <span>{brutoMensual.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>SS trabajador ({SS_PCT}%):</span>
            <span className="text-red-600 dark:text-red-400">−{cuotaSS.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>IRPF ({tipoEfectivoIRPF.toFixed(1)}%):</span>
            <span className="text-red-600 dark:text-red-400">−{cuotaIRPF.toFixed(2)}€/año</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Neto por paga:</span>
            <span className="text-green-600 dark:text-green-400">{netoPaga.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Neto anual:</span>
            <span>{netoAnual.toFixed(2)}€</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground pt-1">
          Estimación orientativa basada en escala IRPF 2025. No incluye deducciones autonómicas ni circunstancias personales adicionales.
        </p>
      </CardContent>
    </Card>
  );
}
