export interface ICreateOrderRequest {
  userId: string;
  products: IOrderProduct[];
  totalPrice: number;
  address: string;
  phoneNumber: string;
  note: string;
}

export interface IOrderProduct {
  productId: string;
  quantity: number;
  price: number;
}
