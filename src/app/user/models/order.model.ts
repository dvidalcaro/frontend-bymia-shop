import { BillData } from './bill-data.model';
import { Product } from './product.model';
import { Recipient } from './recipient.model';

export class Order {
  items?: Product[];
  bill_data?: BillData;
  recipients?: Recipient[];
  constructor() {}
}
