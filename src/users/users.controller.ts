import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {UserService} from "./users.service";
import {Users as UsersModel} from "@prisma/client";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags('Users')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UserService) {}

    /**
     * Функция обращается к функции users класса UsersService, который осуществляет выборку пользователей из БД
     */
    @Get()
    @ApiOperation({ summary: "Selects all users" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    getAllUsers(): Promise<UsersModel[]> {
        return this.usersService.users({});
    }

    @Get('managers')
    getManagers(): Promise<UsersModel[]> {
        return this.usersService.users({
            where: {
                roleId: 2
            }
        })
    }

    /**
     * Функция обращается к функции user класса UsersService, куда передает id пользователя и
     * осуществляет выборку из БД по идентификатору пользователя
     * @param id - уникальный идентификатор пользователя
     */
    @Get(':userId')
    @ApiOperation({ summary: "Searches for a user by id" })
    @ApiParam({ name: "userId", required: true, description: "User identifier" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    getUser(@Param('userId') id: string): Promise<UsersModel> {
        return this.usersService.user({id: Number(id)});
    }

    /**
     * Функция обращается к функции createUser класса UsersService, куда передает
     * объект с данными для создания записи пользователя из БД
     * @param {UsersModel} userData - объект с типом UsersModel, который содержит в себе данные пользователя
     */
    @Post('create')
    @ApiOperation({ summary: "Creates a new user" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    async createUser(
        @Body() userData: {
            email: string,
            name: string,
            lastname: string,
            password: string,
            phone: string,
            birth: string,
            genderId: number,
            roleId: number
        },
    ): Promise<UsersModel> {
        return this.usersService.createUser({
            email: userData.email,
            name: userData.name,
            lastname: userData.lastname,
            phone: userData.phone,
            birth: new Date(userData.birth),
            password: userData.password,
            Gender: {
                connect: {
                    id: userData.genderId
                }
            },
            Roles: {
                connect: {
                    id: userData.roleId
                }
            }
        });
    }

    @Post('logout')
    async logout(@Body() token: string) {

    }

    /**
     * Функция обращается к функции updateUser класса UsersService, куда
     * передает id пользователя и объект с данными для обновления записи пользователя из БД
     * @param {string} id - уникальный идентификатор пользователя
     * @param {UsersModel} userData - объект с типом UsersModel, который содержит в себе данные пользователя
     */
    @Patch(':userId')
    @ApiOperation({ summary: "Updates the user by his id" })
    @ApiParam({ name: "userId", required: true, description: "User identifier" })
    @ApiParam({ name: "userData", required: true, description: "New user data" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    async updateUser(
        @Param('userId') id: string,
        @Body() userData: {
            email?: string,
            name?: string,
            lastname?: string,
            phone?: string,
            birth?: string,
            genderId?: number,
            roleId?: number
        }
    ): Promise<UsersModel> {
        return this.usersService.updateUser({
            where: {id: Number(id)},
            data: {
                email: userData.email,
                name: userData.name,
                lastname: userData.lastname,
                phone: userData.phone,
                birth: new Date(userData.birth),
                Gender: {
                    connect: {
                        id: userData.genderId
                    }
                },
                Roles: {
                    connect: {
                        id: userData.roleId
                    }
                }
            }
        });
    }

    /**
     * Функция обращается к функции DeleteUser класса UsersService, куда
     * передает объект с параметрами для удаления записи пользователя из БД
     * @param {string} id - уникальный идентификатор пользователя
     */
    @Delete(':userId')
    @ApiOperation({ summary: "Deleting a user by id" })
    @ApiParam({ name: "userId", required: true, description: "User identifier" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    async deleteUser(
        @Param('userId') id: string
    ): Promise<UsersModel> {
        console.log(id)
        return this.usersService.deleteUser({id: Number(id)})
    }
}