import { Category } from "./category.model";
export class CategoryGroupValue {
  public category: Category;
  public value: number;
  public date: Date;

  constructor(category?: Category, value?: number, date?: Date) {
    this.category = category;
    this.value = value;
    this.date = date;
  }
}
