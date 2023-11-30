export interface BillRecipientData {
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
export interface orderGenerate {
  id: number;
  billData: BillRecipientData;
  recipient: BillRecipientData;
}
