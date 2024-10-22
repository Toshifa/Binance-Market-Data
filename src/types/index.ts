export interface ICandle {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    closeTime: number;
  }
  
  export interface IChartData {
    [key: string]: ICandle[];
  }
  