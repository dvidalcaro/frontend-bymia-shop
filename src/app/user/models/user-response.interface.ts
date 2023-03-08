export interface UserResponse {
  status: boolean;
  token: string;
  token_type: string;
  expires_in: number;
  user_data: UserData;
}

export interface UserData {
  id: number;
  name: string;
  image: string;
  email: string;
  customer_type_role: number;
  country_phone_code: number;
  gender_type: number;
  wish_list: number[];
  shop_cart: number[];
  cel_phone: string;
  date_of_birth: string;
}
