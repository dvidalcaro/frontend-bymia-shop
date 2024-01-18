export class User {
  id?: number;
  name?: string;
  email?: string;
  image?: string;
  password?: string;
  customer_type_role?: number;
  country_id?: number;
  country_phone_code?: number;
  gender_type?: number;
  gender?: string;
  wish_list?: number[];
  shop_cart?: number[];
  cel_phone?: string;
  phone_code?: string;
  date_of_birth?: string;
  type_user_id?: number;

  constructor() {}
}
