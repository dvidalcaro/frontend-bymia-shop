export class BillData {
  id?: number;
  identity_type?: string;
  identity_number?: string;
  country_id?: number;
  country_name?: string;
  state_id?: number;
  state_name?: string;
  city_id?: number;
  city_name?: string;
  code_zip?: string;
  additional_info?: string;
  address?: string;
  name?: string;
  corporate_name?: string;
  phone?: string;
  email?: string;

  constructor() {}
}
