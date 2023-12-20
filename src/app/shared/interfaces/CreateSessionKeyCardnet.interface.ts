export interface PostSessionKeyCardnet {
  TransactionType: string;
  CurrencyCode: string;
  AcquiringInstitutionCode: string;
  MerchantType: string;
  MerchantNumber: string;
  MerchantTerminal: string;
  MerchantTerminal_amex?: string;
  ReturnUrl: string;
  CancelUrl: string;
  PageLanguaje: string;
  OrdenId?: string;
  TransactionId?: string;
  Tax?: string;
  MerchantName: string;
  AVS: string;
  Amount?: string;
}

export interface GetSessionKeyCardnet {
  SESSION: string;
  sessionkey: string;
}
