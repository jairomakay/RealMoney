import { Category } from './category.model';
export class Expense {
  public value: number;
  public category: Category;
  public image: string;
  public date: Date;

  constructor(value: number, category: Category, image: string) {
    this.value = value;
    this.category = category;
    this.image = image;
    this.date = new Date();
  }
}
