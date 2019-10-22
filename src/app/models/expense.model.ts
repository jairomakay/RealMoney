import { Category } from './category.model';
export class Expense {
  public value: number;
  public category: string;
  public image: string;
  public description: string;
  public date: Date;

  constructor(value?: number, category?: string, image?: string, date?: Date, description?: string) {
    this.value = value;
    this.category = category;
    this.image = image;
    this.date = date;
    this.description = description;
  }
}
