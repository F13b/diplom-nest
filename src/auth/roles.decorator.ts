//ключ декоратора
import {SetMetadata} from "@nestjs/common";

export const ROLES_KEY = 'roles';

/**
 * Функция, которая принимает id роли пользователя
 * @param role
 * @constructor
 */
export const Roles = (role: number) => SetMetadata(ROLES_KEY, role);