import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/types/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  roles: Array<Role>;
}

export const UserSchema = SchemaFactory.createForClass(User);
