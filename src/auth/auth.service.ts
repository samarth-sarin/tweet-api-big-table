import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    console.log('[AuthService] login start', { email });

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Couldnt find user');
    }
    console.log("Found user");
    console.log(password)

    const passwordValid = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    console.log('[AuthService] returning login response');

    return {
      accessToken,
      user,
    };
  }
}
