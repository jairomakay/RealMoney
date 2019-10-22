export class Category {
  public name: string;
  public percentage: number;
  public type: string;
  constructor(name?: string, type: string = 'entrada', percentage?: number, ) {
    this.name = name;
    this.percentage = percentage;
    this.type = type;
  }

}
