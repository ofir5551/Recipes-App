import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editListForm: FormGroup;
  subscription: Subscription;

  editMode: boolean = false;
  editedItem: Ingredient;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.initForm();

    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editedItemIndex = index;

        this.editListForm.setValue({
          itemName: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  initForm() {
    this.editListForm = new FormGroup({
      itemName: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      amount: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const newIngredient: Ingredient = {
      name: this.editListForm.value.itemName,
      amount: this.editListForm.value.amount,
    };

    if (this.editListForm.valid === true)
      if (this.editMode === true) {
        this.shoppingListService.updateIngredient(
          this.editedItemIndex,
          newIngredient
        );
      } else {
        this.shoppingListService.addIngredient({
          name: newIngredient.name,
          amount: newIngredient.amount,
        });
      }
    this.clearForm();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }

  clearForm() {
    this.editListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
