export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  groupId: string;
  token: string;
};

export type ApiSuccessResponse<TData> = {
  code: number;
  message: string;
  data: TData;
};

export type SignInResponse = ApiSuccessResponse<SignInData>;
