import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  constructor() {}

  addIngredients(recipeIngredients: Ingredient[]) {
    this.ingredients.push(...recipeIngredients);

    this.ingredientsChanged.next(this.ingredients.slice()); // Emits a new copy of the updated array
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);

    this.ingredientsChanged.next(this.ingredients.slice()); // Emits a new copy of the updated array
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index].name = newIngredient.name;
    this.ingredients[index].amount = newIngredient.amount

    this.ingredients.splice(index, 1, newIngredient,);

    this.ingredientsChanged.next(this.ingredients.slice()); // Emits a new copy of the updated array
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);

    this.ingredientsChanged.next(this.ingredients.slice()); // Emits a new copy of the updated array
  }
}
