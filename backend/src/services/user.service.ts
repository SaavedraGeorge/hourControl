import prisma from '../config/prisma';
import { hashPassword, comparePassword } from '../utils/password';

/**
 * DTO para crear un usuario.
 */
export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  /** Opcional: rol del usuario; por defecto "USER" */
  role?: 'ADMIN' | 'USER';
}

/** DTO para login */
export interface LoginDto {
  email: string;
  password: string;
}

export class UserService {
  /** Crear un usuario nuevo */
  static async create(dto: CreateUserDto) {
    const existing = await prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new Error('El email ya está en uso');
    }
    const hashed = await hashPassword(dto.password);
    const user = await prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        name: dto.name,
        ...(dto.role ? { role: dto.role } : {}),
      },
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /** Autenticar usuario y devolver datos para JWT */
  static async login(dto: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    const matches = await comparePassword(dto.password, user.password);
    if (!matches) {
      throw new Error('Credenciales inválidas');
    }
    return { id: user.id, email: user.email, role: user.role };
  }
}
