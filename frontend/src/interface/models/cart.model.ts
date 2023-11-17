export interface ICartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface IDeliveringInfo {
  address: string;
  phoneNumber: string;
  note: string;
}
