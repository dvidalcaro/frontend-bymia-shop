export interface MyAddresses {
  additional_info?: string;
  code_id: number;
  name: string;
  phone: string;
  country: string;
  country_id: number;
  state_id: number;
  state: string;
  city_id: number | undefined;
  city: string;
  zip_code: string;
  address: string;
}
export interface LatestBillingData {
  additional_info: string;
  code_id: number;
  type_user?: string;
  name: string;
  email: string;
  phone_code: string;
  phone: string;
  identity_type: string;
  identity_number: string;
  country_id: number;
  country: string;
  state_id: number;
  state: string;
  city_id: number | undefined;
  city: string;
  address: string;
  zip_code: string;
}

export interface UserProfileData {
  code_id: number;
  type_user_id: number;
  type_user: string;
  name: string;
  email: string;
  country_id: number;
  phone_code: string;
  phone: string;
  gender_id: number;
  gender: string;
  birthdate: string;
  latest_billing_data: LatestBillingData | null;
  my_addresses: MyAddresses[];
}

export interface UserProfile {
  customerData: UserProfileData;
  status: boolean;
}
