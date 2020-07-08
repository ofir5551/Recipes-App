import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomato', 3),
    new Ingredient('Onion', 2),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  constructor() {}

  addIngredients(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);

    this.ingredientsChanged.emit(this.ingredients.slice()); // Emits a new copy of the updated array
  }

  addIngredientsToShoppingList(recipeIngredients: Ingredient[]) {
    this.ingredients.push(...recipeIngredients);

    this.ingredientsChanged.emit(this.ingredients.slice()); // Emits a new copy of the updated array
  }
}
