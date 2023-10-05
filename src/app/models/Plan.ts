export class Plan {
  _id?: number;
  type: string;
  price_pla: number;
  constructor(type: string, price_pla: number) {
    this.type = type;
    this.price_pla = price_pla;
  }
}
