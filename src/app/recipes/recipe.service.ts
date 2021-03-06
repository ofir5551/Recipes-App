import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../shared/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // slice to return copy instead of ref
  }

  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

/*
new Recipe(
  'Burger',
  'A tasty hamburger',
  'https://c.pxhere.com/photos/2d/ad/beef_bread_breakfast_bun_burger_cheese_close_up_delicious-1550741.jpg!d',
  [
    new Ingredient('Bun', 2),
    new Ingredient('Meat', 1),
    new Ingredient('Tomato', 3),
  ]
),
new Recipe(
  'Pizza',
  'Great Italian Pizza!',
  'https://live.staticflickr.com/3176/2976856006_7661f79a15_b.jpg',
  [new Ingredient('Cheese', 5), new Ingredient('Tomato Sauce', 2)]
),
new Recipe(
  'Mac & Cheese',
  "Roni's famous mac & cheese!",
  'https://www.inspiredtaste.net/wp-content/uploads/2018/10/Easy-Creamy-Stovetop-Mac-and-Cheese-1200.jpg',
  [new Ingredient('Macaroni', 15), new Ingredient('Cheddar Cheese', 3)]
)

*/
