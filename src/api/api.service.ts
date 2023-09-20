import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/api.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from './payload/login.payload';
import { Response, Request } from 'express';
import axios from 'axios';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpPayload) {
    const { name, email, password } = signUpPayload;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const token = this.jwtService.sign({
      id: user._id,
    });

    return { token };
  }

  async login(loginPayLoad: LoginPayload, response: Response) {
    const { email, password } = loginPayLoad;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid Email');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid Email');
    }

    const token = this.jwtService.sign({
      id: user._id,
    });

    response.cookie('jwt', token, { httpOnly: true });

    return { message: 'Succesfully Login' };
  }

  async getProfile(request: Request) {
    try {
      const cookies = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookies);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userModel.findOne({ id: data['_id'] });
      // const { password, ...result } = user;
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async logout(response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }

  async getrandomJoke() {
    const joke = await axios.get('https://api.chucknorris.io/jokes/random');
    return joke.data.value;
  }
}
