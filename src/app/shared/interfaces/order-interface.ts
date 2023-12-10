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
import { BillRecipientData } from './OrderGenerate-interface';

export interface orderInformation {
  bill_address: BillRecipientData | null;
  recipient_address: BillRecipientData[] | null;
  orderPlaced: string;
  total: string;
  sendTo: string;
  numberOrder: string;
  detail: orderDetails;
  bill: string;
  receiptOfPayment: string;
  status: number;
}
