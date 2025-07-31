export interface UserRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  token: string;
  user: {
    email: string;
    id: string;
  };
}
