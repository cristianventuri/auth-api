import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioPayload } from './models/UsuarioPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  login(usuario: Usuario): UserToken {
    const payload: UsuarioPayload = {
      sub: usuario.id,
      email: usuario.email,
      name: usuario.name,
    };

    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken
    }
  }

  async validateUser(email: string, password: string) {
    const usuario = await this.usuarioService.findByEmail(email);

    if (usuario) {
      const isPasswordValid = await bcrypt.compare(password, usuario.password);

      if (isPasswordValid) {
        return {
          ...usuario,
          password: undefined,
        };
      }
    }

    throw new Error('E-mail ou senha incorretos.');
  }
}
