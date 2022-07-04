import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse
} from '@nestjs/swagger';

import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';

export const CreateUserDecorator = () => {
  return applyDecorators(
    ApiOperation({
      description: 'API call to create a user for the api.'
    }),
    ApiBody({
      description: 'New user credentials for the aplication.',
      type: CreateUserDto
    }),
    ApiCreatedResponse({
      description: 'The user has been successfully created.',
      type: User
    }),
    ApiUnauthorizedResponse({
      description:
        'Unauthorized error: Authorization information is missing or invalid.'
    }),
    ApiBadRequestResponse({
      description: 'Bad request error: The request body is malformed.'
    }),
    ApiInternalServerErrorResponse({
      description:
        "Internal server error: Generic error for diferent cases, the description of the error will be in the 'message' property."
    })
  );
};
