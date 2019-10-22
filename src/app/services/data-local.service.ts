import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Category } from '../models/category.model';
import { Expense } from '../models/expense.model';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  public categorys: Category[] = [];
  public expenses: Expense[] = [];

  constructor(private storage: Storage) {
    this.initCategory();
    this.initExpense();
  }

  async initCategory() {
    this.categorys = await this.storage.get('categorys') || [];
  }

  async initExpense() {
    this.expenses = await this.storage.get('expenses') || [];
  }

  saveCategory(category: Category) {
    const findCat = this.categorys.find(cat => cat.name === category.name);
    // se existir a categoria não adiciona
    if (findCat) {
      return;
    }

    this.categorys.unshift(category);
    this.storage.set('categorys', this.categorys);
  }

  saveExpense(expense: Expense) {
    this.expenses.unshift(expense);
    this.storage.set('expenses', this.expenses);
  }


}
