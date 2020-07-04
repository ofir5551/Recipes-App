import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Burger',
      'A tasty hamburger',
      'https://c.pxhere.com/photos/2d/ad/beef_bread_breakfast_bun_burger_cheese_close_up_delicious-1550741.jpg!d'
    ),
    new Recipe(
      'Pizza',
      'Great Italian Pizza!',
      'https://live.staticflickr.com/3176/2976856006_7661f79a15_b.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
