export interface LoginAuthResponse {
    token:      string;
    token_type: string;
    expires_in: string;
    user_data:  UserData;
}

export interface UserData {
    name:  string;
    id:    string;
    image: string;
}
