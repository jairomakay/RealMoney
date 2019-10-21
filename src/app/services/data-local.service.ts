import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Category } from '../models/category.model';
import { Expense } from '../models/expense.model';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  public categorys: Category[] = [];
  expenses: Expense[] = [];

  constructor(private storage: Storage) {
    this.initCategory();
  }

  async initCategory() {
    this.categorys = await this.storage.get('categorys') || [];
  }

  saveCategory(name: string) {
    const category = new Category(name);
    const findCat = this.categorys.find(cat => cat.name === name);
    // se existir a categoria não adiciona
    if (findCat) {
      return;
    }

    this.categorys.unshift(category);
    this.storage.set('categorys', this.categorys);
  }

  saveExpense(value: number, category: Category, image: string) {
    const expense = new Expense(value, category, image);
    this.expenses.unshift(expense);
    this.storage.set('expenses', this.expenses);
  }

}
