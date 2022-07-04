import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ id });

    if (!user)
      throw new NotFoundException(`The user with '${id}' was not found.`);

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      id: createUserDto.id
    });

    if (existingUser)
      throw new ConflictException(
        `The user with id:'${createUserDto.id}' already exist.`
      );

    return this.userModel.create(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findById(id);

    if (!existingUser)
      throw new NotFoundException(`The user with id '${id}' was not found.`);

    if (updateUserDto.id) {
      const existingDevice = await this.userModel.findOne({
        id: updateUserDto.id
      });

      if (existingDevice.id !== existingUser.id)
        throw new ConflictException(
          `The device id ${updateUserDto.id} already exist.`
        );
    }

    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
      returnDocument: 'after'
    });
  }

  async remove(id: string) {
    const existingUser = await this.userModel.findById(id);

    if (!existingUser)
      throw new NotFoundException(`The user with id '${id}' was not found.`);

    await this.userModel.deleteOne({ _id: id });

    return {
      statusCode: 200,
      message: `The user with id '${id}' has been deleted succesfully`
    };
  }
}
