export interface BillRecipientData {
  address_id: number | null;
  name: string;
  identity_type: string;
  identity_number: string;
  country_id: string;
  state_id: string;
  city_id: string;
  address: string;
  code_zip: string;
  phone: string;
  email: string;
  additional_info?: string;
}
export interface OrderGenerate {
  id: number;
  billData: BillRecipientData;
  recipient: BillRecipientData;
  same_address: boolean;
  paymentTypeId: string;
}
