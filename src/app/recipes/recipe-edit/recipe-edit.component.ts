import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; // + is for casting to number
      this.editMode = params['id'] != null; // will be true if url contains an id
    });

    this.initForm();
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.get('name').value,
    //   this.recipeForm.get('description').value,
    //   this.recipeForm.get('imagePath').value,
    //   this.recipeForm.get('ingredients').value
    // )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancelEdit(); // navigate away from edit form
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancelEdit() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm(): void {
    let recipeName: string = '';
    let recipeImagePath: string = '';
    let recipeDescription: string = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (this.editMode) {
      // Fetching the edited recipe
      const editedRecipe = this.recipeService.getRecipeByIndex(this.id);

      recipeName = editedRecipe.name;
      recipeImagePath = editedRecipe.imagePath;
      recipeDescription = editedRecipe.description;
      if (editedRecipe['ingredients'])
        for (let ingredient of editedRecipe.ingredients)
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.min(1),
              ]),
            })
          );
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients,
    });
  }

  get ingredientsControls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
