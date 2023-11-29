export interface itemDetail {
  quantity: string;
  name: string;
  price: string;
}

export interface productDetail {
  total: string;
  totalPrice: string;
}

export interface orderDetails {
  items: itemDetail[];
  products: productDetail;
  productDiscount: string;
  promocionalDiscount: string;
  tax: string;
  totalOrderPrice: string;
}

export interface orderInformation {
  orderPlaced: string;
  total: string;
  sendTo: string;
  numberOrder: string;
  detail: orderDetails;
  bill: string;
  receiptOfPayment: string;
}
