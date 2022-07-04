export class LoginOkOutput {
  statusCode: number;

  access_token: string;
}

export class LoginBadRequestOutput {
  statusCode: number;

  message: string;
}
