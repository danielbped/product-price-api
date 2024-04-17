export default class ComparePrices {
  private percentage = 0.1;

  public isLower(price: number, newPrice: number) {
    return newPrice < price * (1 - this.percentage);
  };

  public isHigher(price: number, newPrice: number) {
    return newPrice > price * (1 + this.percentage);
  };
};