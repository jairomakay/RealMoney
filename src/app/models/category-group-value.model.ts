import { Category } from './category.model';
export class CategoryGroupValue {
  public category: Category;
  public value: number;

  constructor(category?: Category, value?: number) {
    this.category = category;
    this.value = value;
  }
}