import useLocalStorage from './use-local-storage';

export type CalculationType = 'vat' | 'discount' | 'offer' | 'financing' | 'currency';

export interface CalculationRecord {
  id: string;
  type: CalculationType;
  timestamp: number;
  input: Record<string, any>;
  result: Record<string, any>;
}

const useCalculationHistory = () => {
  const [history, setHistory] = useLocalStorage<CalculationRecord[]>('calc_history', []);

  const addCalculation = (type: CalculationType, input: Record<string, any>, result: Record<string, any>) => {
    const newRecord: CalculationRecord = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      timestamp: Date.now(),
      input,
      result,
    };

    setHistory((prev) => [newRecord, ...prev].slice(0, 50)); // Keep last 50 calculations
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getHistoryByType = (type: CalculationType) => {
    return history.filter((record) => record.type === type);
  };

  const shareCalculation = async (record: CalculationRecord) => {
    let shareText = `${record.type.toUpperCase()} Calculation\n`;
    shareText += `Input: ${JSON.stringify(record.input, null, 2)}\n`;
    shareText += `Result: ${JSON.stringify(record.result, null, 2)}\n`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Calculation Result',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        console.log('Copied to clipboard');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  return {
    history,
    addCalculation,
    clearHistory,
    getHistoryByType,
    shareCalculation,
  };
};

export default useCalculationHistory;