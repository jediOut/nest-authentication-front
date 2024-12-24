export interface SignUpData {
    email: string;
    password: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
  }
  
  export interface ErrorResponse {
    message: string;
  }
  