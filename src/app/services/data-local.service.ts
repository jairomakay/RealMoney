import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Category } from '../models/category.model';
import { Expense } from '../models/expense.model';
import { CategoryGroupValue } from '../models/category-group-value.model';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  public categorys: Category[] = [];
  public expenses: Expense[] = [];
  public groupcategoryValue: CategoryGroupValue[] = [];

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

  async getCategoryByGroupSumValue() {
    // carrega lista de despesas
    await this.initExpense();
    // novo array de grupos
    this.groupcategoryValue = [];

    const reduced = this.expenses.reduce((m, d) => {
      if (!m[d.category]) {
        m[d.category] = { ...d, count: 1 };
        return m;
      }
      m[d.category].value += d.value;
      return m;
    }, {});

    const result = Object.keys(reduced).map((k) => {
      return reduced[k];
    });

    console.log('despesas calculadas', result);
  }

  saveExpense(expense: Expense) {
    this.expenses.unshift(expense);
    this.storage.set('expenses', this.expenses);
  }


}
