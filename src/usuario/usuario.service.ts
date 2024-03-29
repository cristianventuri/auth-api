import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const data = {
      ...createUsuarioDto,
      password: await bcrypt.hash(createUsuarioDto.password, 10),
    };

    const createdUsuario = await this.prisma.usuario.create({ data });
    return {
      ...createdUsuario,
      password: undefined,
    };
  }

  async findByEmail(email: string){
    return this.prisma.usuario.findUnique({
      where: { email }
    })
  }

  // findAll() {
  //   return `This action returns all usuario`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} usuario`;
  // }

  // update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  //   return `This action updates a #${id} usuario`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} usuario`;
  // }
}
