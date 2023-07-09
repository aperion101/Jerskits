export interface IAuthSliceState {
  accessToken: string | null;
}

export type TSignUpRequest = {
  email: string;
  fullName: string;
  password: string;
};

export type TAuthResponseError = {
  status: number;
  data: {
    error: boolean;
    message: string;
  };
};

export type TSignInRequest = {
  email: string;
  password: string;
};
