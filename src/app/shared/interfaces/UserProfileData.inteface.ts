export interface MyAddresses {
  address_id: number;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  address: string;
}
export interface LatestBillingData {
  code_id: number;
  type_user?: string;
  name: string;
  email: string;
  phone: string;
  identity_type: string;
  identity_number: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zip_code: string;
}

export interface UserProfileData {
  code_id: number;
  type_user: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: string;
  latest_billing_data: LatestBillingData | null;
  my_addresses: MyAddresses[];
}

export interface UserProfile {
  customerData: UserProfileData;
  status: boolean;
}
