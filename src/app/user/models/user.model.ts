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
  wish_list?: number[];
  shop_cart?: number[];
  cel_phone?: string;
  date_of_birth?: string;

  constructor() {}
}
