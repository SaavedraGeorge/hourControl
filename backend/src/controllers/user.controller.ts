// backend/src/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import { UserService, CreateUserDto, LoginDto } from '../services/user.service';
import { generateToken } from '../utils/jwt';

/**
 * Controlador de usuarios – expone los endpoints HTTP y delega en el service.
 */
export class UserController {
  /**
   * POST /api/users
   * Registra un nuevo usuario.
   */
  static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto: CreateUserDto = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
      };

      const user = await UserService.create(dto);
      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/users/login
   * Autentica al usuario y devuelve un JWT.
   */
  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto: LoginDto = {
        email: req.body.email,
        password: req.body.password,
      };

      const payload = await UserService.login(dto);
      const token = generateToken(payload);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}