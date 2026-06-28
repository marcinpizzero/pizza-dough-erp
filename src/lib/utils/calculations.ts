// src/lib/utils/calculations.ts
// Funkcje biznesowe dla PIZZA DOUGH ERP LITE

/**
 * Weighted Average Cost - ważony średni koszt zakupu składnika
 * WAC = Suma(ilość × cena_netto) / Suma(ilość)
 * @param purchases - lista dostaw danego składnika
 * @returns średni ważony koszt jednostkowy (za 1 kg lub 1 l)
 */
export function calculateWAC(
    purchases: { quantity: number; purchase_price_net: number }[]
  ): number {
    if (!purchases || purchases.length === 0) return 0;
  
    const totalCost = purchases.reduce(
      (sum, p) => sum + p.quantity * p.purchase_price_net,
      0
    );
    const totalQty = purchases.reduce((sum, p) => sum + p.quantity, 0);
  
    return totalQty > 0 ? totalCost / totalQty : 0;
  }
  
  /**
   * Food Cost % - procentowy udział kosztu składników w cenie sprzedaży
   * FC% = (koszt składników / cena sprzedaży) × 100
   * @param ingredientCost - całkowity koszt składników (zł)
   * @param sellingPrice - cena sprzedaży pizzy (zł)
   * @returns Food Cost w procentach
   */
  export function calculateFoodCostPercent(
    ingredientCost: number,
    sellingPrice: number
  ): number {
    if (sellingPrice <= 0) return 0;
    return (ingredientCost / sellingPrice) * 100;
  }
  
  /**
   * Yield Score - wskaźnik wydajności produkcji
   * YS = (rzeczywista produkcja / teoretyczna produkcja) × 100
   * @param actual - rzeczywista wyprodukowana ilość
   * @param theoretical - teoretycznie oczekiwana ilość
   * @returns Yield Score w procentach
   */
  export function calculateYieldScore(
    actual: number,
    theoretical: number
  ): number {
    if (theoretical <= 0) return 100;
    return (actual / theoretical) * 100;
  }
  
  /**
   * Oblicza całkowitą masę ciasta na podstawie liczby i wagi kulek
   * @param ballCount - liczba kulek
   * @param ballWeightG - waga jednej kulki w gramach
   * @returns masa ciasta w kg
   */
  export function calculateDoughFromBalls(
    ballCount: number,
    ballWeightG: number
  ): number {
    return (ballCount * ballWeightG) / 1000;
  }
  
  /**
   * Oblicza ilości składników na podstawie masy ciasta i parametrów receptury
   * @param doughKg - masa ciasta w kg
   * @param hydrationPct - hydratacja w %
   * @param saltPct - sól w %
   * @param yeastPct - drożdże w %
   * @param oilPct - oliwa w %
   * @returns obiekt z ilościami składników w kg i litrach
   */
  export function calculateIngredientsForDough(
    doughKg: number,
    hydrationPct: number,
    saltPct: number,
    yeastPct: number,
    oilPct: number
  ): {
    flourKg: number;
    waterL: number;
    saltKg: number;
    yeastKg: number;
    oilL: number;
  } {
    const totalPercent = 100 + hydrationPct + saltPct + yeastPct + oilPct;
    const flourKg = (doughKg * 100) / totalPercent;
  
    return {
      flourKg,
      waterL: (flourKg * hydrationPct) / 100,
      saltKg: (flourKg * saltPct) / 100,
      yeastKg: (flourKg * yeastPct) / 100,
      oilL: (flourKg * oilPct) / 100,
    };
  }
  
  /**
   * Oblicza liczbę wsadów miksera potrzebnych do wyrobienia danej ilości ciasta
   * @param totalDoughKg - całkowita masa ciasta do wyrobienia (kg)
   * @param bowlCapacityKg - pojemność misy miksera (kg)
   * @param utilizationPct - bezpieczne wykorzystanie pojemności (%)
   * @returns liczba wsadów i masa ciasta na jeden wsad
   */
  export function calculateMixerBatches(
    totalDoughKg: number,
    bowlCapacityKg: number,
    utilizationPct: number
  ): { batches: number; doughPerBatchKg: number } {
    const maxBatchKg = (bowlCapacityKg * utilizationPct) / 100;
  
    if (maxBatchKg <= 0) return { batches: 0, doughPerBatchKg: 0 };
  
    const batches = Math.ceil(totalDoughKg / maxBatchKg);
    const doughPerBatchKg = totalDoughKg / batches;
  
    return { batches, doughPerBatchKg };
  }
  
  /**
   * Oblicza koszt straty na podstawie ilości i ceny jednostkowej (WAC)
   * @param lossQuantity - ilość straconego składnika
   * @param wacPrice - średni ważony koszt jednostkowy
   * @returns koszt straty w zł
   */
  export function calculateLossCost(
    lossQuantity: number,
    wacPrice: number
  ): number {
    return lossQuantity * wacPrice;
  }
  
  /**
   * Zwraca klasę CSS dla koloru wskaźnika Yield Score
   * @param score - Yield Score w %
   * @returns klasa CSS (tailwind)
   */
  export function getYieldColorClass(score: number): string {
    if (score >= 98) return 'text-green-600 bg-green-50';
    if (score >= 95) return 'text-yellow-600 bg-yellow-50';
    if (score >= 90) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  }
  
  /**
   * Zwraca etykietę słowną dla Yield Score
   * @param score - Yield Score w %
   * @returns etykieta po polsku
   */
  export function getYieldLabel(score: number): string {
    if (score >= 98) return 'Bardzo dobrze';
    if (score >= 95) return 'Dobrze';
    if (score >= 90) return 'Wymaga kontroli';
    return 'Alarm!';
  }
  
  /**
   * Zwraca klasę CSS dla wskaźnika Food Cost
   * @param foodCostPercent - Food Cost w %
   * @returns klasa CSS (tailwind)
   */
  export function getFoodCostColorClass(foodCostPercent: number): string {
    if (foodCostPercent < 20) return 'text-green-600 bg-green-50';
    if (foodCostPercent <= 30) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  }