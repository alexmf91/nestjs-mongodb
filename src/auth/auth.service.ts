import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  logger: Logger;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async login(authUserDto: AuthUserDto) {
    this.logger.debug('login is triggered');
    const user = await this.usersService.findOne(authUserDto.identificator);

    if (!user) throw new UnauthorizedException();

    return {
      statusCode: 200,
      access_token: this.jwtService.sign({
        id: user.id,
        name: user.name,
        roles: user.roles
      })
    };
  }
}
