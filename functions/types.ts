/**
 * This file is aliased for import from the UI codebase via tsconfig.json
 *
 * To use in your React code:
 * import { IFruit } from '~types';
 */

export type TFruit = {
  id: number;
  name: string;
  emoji: string;
  stars: number;
  price: number;
  shipDate: string;
  categories: string[];
  tags?: string[];
  onSale?: boolean;
  saleDiscount?: number;
};
