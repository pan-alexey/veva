import type { StatsError } from 'webpack';

export interface ModuleData {
  name: string;
  hash?: string;
  time?: number;
  warnings: Array<StatsError>;
  errors: Array<StatsError>;
}