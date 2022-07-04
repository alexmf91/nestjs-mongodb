import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';
import { LoginOkOutput, LoginBadRequestOutput } from '../types/outputs';

export const LoginDecorator = () => {
  return applyDecorators(
    ApiOperation({ description: 'API call to login as a user into the app' }),
    ApiCreatedResponse({
      description:
        'In case the API call works fine and get throught the login process right we get:',
      type: LoginOkOutput
    }),
    ApiBadRequestResponse({
      description:
        'Bad Request error:\n\n- This is the generic error type for not being able to process the request, and will generally contain an explanation in the message.\n\nInvalid Resource:\n\n- The submitted LOGIN body failed our input validation. This error may include an additional “errors” property, with a list of the validation issues.\n\nInvalid Action:\n\n- The action requested was not valid for this resource.\n\n- Returned when you try to access an action on a resource that doesn’t support that action.',
      type: LoginBadRequestOutput
    }),
    ApiNotFoundResponse({
      description:
        "Not found error: The user that is trying to login doesn't exist."
    })
  );
};
