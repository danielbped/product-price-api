export default class ComparePrices {
  public isLower(price: number, newPrice: number) {
    return newPrice < (price - (price * 1/10))
  };

  public isHigher(price: number, newPrice: number) {
    return newPrice > (price + (price * 1/10))
  };
};