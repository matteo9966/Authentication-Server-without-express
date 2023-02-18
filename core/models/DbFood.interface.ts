export interface DBFood {
  id: number;
  name: string;
  quantity: number;
  expires: Date;
  description: string;
  tags: string[];
}

export interface FoodMacros {
  calories: number;
  fats: number;
  proteins: number;
  carbs: number;
  unit: macroFactor;
}

export type macroFactor = "g/100g" | "g/l";
