export interface RegisterUser {
    customer_type_role:     string;
    name:                   string;
    email:                  string;
    password:               string;
    country_phone_code:     string;
    cel_phone:              string;
    gender_type?:            string;
    date_of_birth?:          string;
    identity_type?:          string;
    identity_number?:        string;
    accept?:                 string;
}