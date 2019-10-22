export class Category {
  public name: string;
  public percentage: number;
  public type: string;
  public color: string;
  constructor(name?: string, type: string = 'entrada', percentage?: number, color?: string) {
    this.name = name;
    this.percentage = percentage;
    this.type = type;
    this.color = color;
  }

}
