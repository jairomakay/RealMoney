import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Category } from "../models/category.model";
import { Expense } from "../models/expense.model";
import { CategoryGroupValue } from "../models/category-group-value.model";
@Injectable({
  providedIn: "root"
})
export class DataLocalService {
  public categorys: Category[] = [];
  public expenses: Expense[] = [];
  public groupCategoryValue: CategoryGroupValue[] = [];
  public lastExpenses: Expense[] = [];
  public saldo: Number = 0;

  constructor(private storage: Storage) {
    this.initCategory();
    this.initExpense();
  }

  async initCategory() {
    this.categorys = (await this.storage.get("categorys")) || [];
  }

  async initExpense() {
    this.expenses = (await this.storage.get("expenses")) || [];
  }

  saveCategory(category: Category) {
    const findCat = this.categorys.find(cat => cat.name === category.name);
    // se existir a categoria não adiciona
    if (findCat) {
      return;
    }

    this.categorys.unshift(category);
    this.storage.set("categorys", this.categorys);
  }
  /*
  salva despesas
  */
  saveExpense(expense: Expense) {
    this.expenses.unshift(expense);
    this.storage.set("expenses", this.expenses);
  }
  /*
    Retorna os gastos ordenados por categorias
  */
  async getCategoryByGroupSumValue() {
    // carrega lista de despesas
    await this.initExpense();
    // novo array de grupos
    this.groupCategoryValue = [];

    const reduced = this.expenses.reduce((m, d) => {
      if (!m[d.category.name]) {
        m[d.category.name] = { ...d };
        return m;
      }
      m[d.category.name].value += d.value;
      return m;
    }, {});

    const result = Object.keys(reduced).map(k => {
      return reduced[k];
    });

    this.groupCategoryValue = result;
  }

  async getExpenses() {
    await this.initExpense();
  }

  async getExpensesOrderDate() {
    // carrega lista de despesas
    await this.initExpense();

    this.lastExpenses = [];

    this.lastExpenses = this.expenses.sort((a: Expense, b: Expense) => {
      const one = new Date(a.date);
      const two = new Date(b.date);
      return one > two ? -1 : one < two ? 1 : 0;
    });
  }

  // faz calculo do saldo de despesas
  async calcSaldoExpenses() {
    await this.initExpense();

    console.log("saldo da conta", this.expenses);

    let saldo = this.expenses.reduce((saldo, expense) => {
      if (expense.category.type == "entrada") {
        saldo = saldo + expense.value;
      } else if (expense.category.type == "saida") {
        saldo = saldo - expense.value;
      }

      return saldo;
    }, 0);

    console.log("saldo da conta", saldo);
    this.saldo = saldo;
  }
}
