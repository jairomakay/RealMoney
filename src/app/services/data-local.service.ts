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
  public listHistoricExpenses: Expense[] = [];
  public saldo: number = 0;
  public dizimo: number = 0;

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

  deleteCategory(category: Category) {
    let categorys = this.categorys.filter(cat => {
      return cat.name !== category.name;
    });
    console.log(categorys);
    this.storage.set("categorys", categorys);
  }

  deleteExpense(expense: Expense) {
    let expenses = this.expenses.filter(exp => {
      return expense !== exp;
    });
    console.log(expenses);
    this.storage.set("expenses", expenses);
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
  async getCategoryByGroupSumValue(month?: number) {
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

    let result: CategoryGroupValue[] = Object.keys(reduced).map(k => {
      return reduced[k];
    });
    // se existir filtro por data retorna somente do mês
    this.groupCategoryValue = month
      ? result.filter(cat => {
          console.log(cat.date);
          const date: Date = new Date(cat.date);
          const monthDB: number = date.getMonth() + 1;
          return monthDB === month;
        })
      : result;
  }

  async getExpenses() {
    await this.initExpense();
  }

  async getExpensesOrderDate() {
    // carrega lista de despesas
    await this.initExpense();

    this.lastExpenses = [];

    this.lastExpenses = this.expenses
      .sort((a: Expense, b: Expense) => {
        const one = new Date(a.date);
        const two = new Date(b.date);
        return one > two ? -1 : one < two ? 1 : 0;
      })
      .slice(0, 3);
  }
  // lista hsitorico de despesas por data
  async getHistoricExpenses(date: Date) {
    // carrega lista de despesas
    await this.initExpense();
    this.listHistoricExpenses = [];

    let listHistoricExpenses = this.expenses.filter(expense => {
      let paramDate = new Date(date);
      let dateDB = new Date(expense.date);
      //pega mês corretamente
      const monthParam = paramDate.getMonth() + 1;
      const monthDB = dateDB.getMonth() + 1;
      //pega ano
      const yearParam = paramDate.getFullYear();
      const yearDB = dateDB.getFullYear();

      return monthDB == monthParam && yearDB == yearParam;
    });

    this.listHistoricExpenses = listHistoricExpenses.sort(
      (a: Expense, b: Expense) => {
        const one = new Date(a.date);
        const two = new Date(b.date);
        return one > two ? -1 : one < two ? 1 : 0;
      }
    );
  }

  // faz calculo do saldo de despesas
  async calcSaldoExpenses() {
    await this.initExpense();

    let saldo = this.expenses.reduce((saldo, expense) => {
      if (expense.category.type == "entrada") {
        saldo = saldo + expense.value;
      } else if (expense.category.type == "saida") {
        saldo = saldo - expense.value;
      }

      return saldo;
    }, 0);

    this.saldo = saldo;
  }

  //calcula o dizimo
  async calcDizimo() {
    await this.initExpense();

    let dizimo = this.expenses.reduce((dizimo, expense) => {
      if (expense.category.type == "entrada") {
        dizimo = dizimo + (expense.value * expense.category.percentage) / 100;
      }
      return dizimo;
    }, 0);

    this.dizimo = dizimo;
  }
}
