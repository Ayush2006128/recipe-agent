export interface RecipeFlowInput {
  ingredient: string;
  restrictions?: string | undefined;
}

export interface RecipeFlowOutput {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instrictions: string[];
  tips: (string | undefined)[];
}
