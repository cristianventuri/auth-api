import { Usuario } from '../entities/usuario.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto extends Usuario {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString({ message: 'A senha precisa estar no formato texto.' })
  @MinLength(4, { message: 'A senha é menor que o tamanho permitido.' })
  @MaxLength(50, { message: 'A senha é maior que o tamanho permitido.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha não corresponde aos padrões de segurança exigidos.',
  })
  password: string;

  @IsString( { message: 'O nome precisa estar no formato texto.' })
  name: string;
}
