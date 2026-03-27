import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCalculationHistory from '@/hooks/use-calculation-history';
import { toast } from '@/hooks/use-toast';
import { analytics } from "@/lib/analytics";

type ExchangeRates = { [key: string]: number };

export function CurrencyCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [result, setResult] = useState<number | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const { addCalculation, shareCalculation } = useCalculationHistory();

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await response.json();
        setExchangeRates(data.rates);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los tipos de cambio:', error);
        setApiError(true);
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const calculateResult = () => {
    if (!amount || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return;

    const amountInEUR = parseFloat(amount) / exchangeRates[fromCurrency];
    const calculatedResult = amountInEUR * exchangeRates[toCurrency];
    setResult(calculatedResult);

    addCalculation('currency',
      { amount, fromCurrency, toCurrency },
      { result: calculatedResult, rate: exchangeRates[toCurrency] / exchangeRates[fromCurrency] }
    );
  };

  useEffect(() => {
    calculateResult();

    // Track currency selection when both currencies are selected
    if (fromCurrency && toCurrency) {
      analytics.trackEvent('select_currency', {
        from_currency: fromCurrency,
        to_currency: toCurrency,
        currency_pair: `${fromCurrency}_${toCurrency}`
      });
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleShare = () => {
    if (result !== null) {
      const exchangeRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      const convertedAmount = result;

      const shareText = `💰 Conversión de Divisas\n\n${parseFloat(amount).toLocaleString()} ${fromCurrency} = ${convertedAmount.toLocaleString()} ${toCurrency}\nTasa de cambio: 1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}\n\n📱 Calculado con Calculadora Financiera | ${window.location.href}`;

      analytics.trackShare('share', 'currency_calculation');
      analytics.trackCalculation('currency', {
        amount: parseFloat(amount),
        from_currency: fromCurrency,
        to_currency: toCurrency,
        exchange_rate: exchangeRate,
        converted_amount: convertedAmount
      });

      if (navigator.share) {
        navigator.share({
          title: 'Conversión de Divisas',
          text: shareText
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(shareText)
          .then(() => toast({ title: "Copiado al portapapeles" }))
          .catch(console.error);
      }
    }
  };

  const handleExternalLinkClick = (linkName: string, url: string) => {
    analytics.trackExternalLinkClick(linkName, url);
  };

  const currencies = [
    { code: 'EUR', flag: '🇪🇺' },
    { code: 'USD', flag: '🇺🇸' },
    { code: 'GBP', flag: '🇬🇧' },
    { code: 'JPY', flag: '🇯🇵' },
    { code: 'AUD', flag: '🇦🇺' },
    { code: 'CAD', flag: '🇨🇦' },
    { code: 'CHF', flag: '🇨🇭' },
    { code: 'CNY', flag: '🇨🇳' },
    { code: 'INR', flag: '🇮🇳' }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calculadora de Divisas</CardTitle>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiError && (
          <div className="text-sm text-red-600 dark:text-red-400 text-center py-2 border border-red-200 dark:border-red-800 rounded-md">
            No se pudieron cargar los tipos de cambio. Comprueba tu conexión.
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="amount">Cantidad</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              const normalizedValue = value.replace(/,/g, '.');
              if (!isNaN(parseFloat(normalizedValue)) || normalizedValue === '') {
                setAmount(normalizedValue);
              }
            }}
            placeholder="Introduce la cantidad"
            className="flex-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fromCurrency">De</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona divisa" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} {currency.flag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="toCurrency">A</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona divisa" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} {currency.flag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {result !== null && (
          <div className="pt-4 space-y-2">
            <div className="text-center">
              <div className="text-lg">
                {parseFloat(amount).toLocaleString()} {fromCurrency} {currencies.find(c => c.code === fromCurrency)?.flag}=
              </div>
              <div className="text-2xl font-bold">
                {result.toLocaleString()} {toCurrency} {currencies.find(c => c.code === toCurrency)?.flag}
              </div>
            </div>
          </div>
        )}
        <div className="text-sm text-muted-foreground text-center mt-4 border-t pt-4">
          Datos proporcionados por{' '}
          <a
            href="https://www.exchangerate-api.com"
            onClick={() => handleExternalLinkClick('exchange_rate_api', 'https://www.exchangerate-api.com')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            ExchangeRate-API
          </a>
        </div>
      </CardContent>
    </Card>
  );
}