export interface AverageMetrics {
  totalCredits: number;
  totalAmount: number;
  averageAmount: number;
  totalInterest: number;
  totalReturnedCredits: number;
}

export interface MetricsByMonth {
  [month: string]: AverageMetrics;
}
