import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Role } from 'src/auth/types/enums/role.enum';

export class CreateUserDto {
  /**
   *The id of the user
   * @example 352698276144152
   */
  @IsString()
  @IsNotEmpty()
  id: string;
  /**
   *The name of the user
   * @example Francisco
   */
  @IsString()
  @IsNotEmpty()
  name: string;
  /**
   *The phone of the user
   * @example +34663090304
   */
  @IsNotEmpty()
  @IsString()
  phone: string;
  /**
   *The plan of the user
   * @example ["standard"]
   */
  @IsNotEmpty()
  @IsArray()
  roles: Array<Role>;
}
