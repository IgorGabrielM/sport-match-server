import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Valida o usuário com email e senha
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Email ou Senha Inválidos');
    }

    // Verifica a senha criptografada usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await this.generateToken(user);
      return { token, user };
    }

    throw new UnauthorizedException('Email ou Senha Inválidos');
  }

  // Gera o token JWT
  async generateToken(payload: User) {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email },
        {
          secret: 'topSecret512', // Idealmente, isso deve vir de uma variável de ambiente
          expiresIn: '2d',
        },
      ),
    };
  }
}
