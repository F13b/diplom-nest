import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles.decorator";
import {JwtService} from "@nestjs/jwt";
import {Payload} from "../tokens/entitites/payload.entity";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            // получение обязательной роли для получения доступа к эндпоинту
            const requiredRole = this.reflector.getAllAndOverride<number>(
                ROLES_KEY,
                [
                    context.getClass(),
                    context.getHandler()
                ]
            );

            //проверка на наличие роли для доступа, если их нет, то эндпоинт публичный
            if (!requiredRole) return true;

            //объект запроса
            const req = context.switchToHttp().getRequest();

            //строка с токеном авторирзации из объекта запроса
            const authHeader = req.headers.authorization;

            //тип токена
            const bearer = authHeader.split(' ')[0];

            //токен
            const token = authHeader.split(' ')[1];

            //проверка типа токена и наличия токена
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            //записываем данные пользователя из токена в запрос
            const user: Payload = this.jwtService.verify(token);
            req.user = user;

            //проверяем роль пользователя
            if (user.roleId === requiredRole) return true;
        } catch (e) {
            console.log(e)
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
}