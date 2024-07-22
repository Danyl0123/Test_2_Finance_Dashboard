export interface AverageMetrics {
  [key: string]: {
    totalCredits: number;
    totalAmount: number;
    averageAmount: number;
    totalInterest: number;
    totalReturnedCredits: number;
  };
}
