import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post} from "@nestjs/common";
import {UserService} from "./users.service";
import {Prisma, Users as UsersModel} from "@prisma/client";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UserService) {}

    @Get()
    @ApiOperation({ summary: "Selects all users" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    getAllUsers(): Promise<UsersModel[]> {
        return this.usersService.users({});
    }

    @Get(':userId')
    @ApiOperation({ summary: "Searches for a user by id" })
    @ApiParam({ name: "userId", required: true, description: "User identifier" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    getUser(@Param('userId') id: string): Promise<UsersModel> {
        return this.usersService.user({id: Number(id)});
    }

    @Post('create')
    async signupUser(
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

    @Patch(':userId')
    updateUser(
        @Param('userId') id: string,
        @Body() userData: {
            email?: string,
            name?: string,
            lastname?: string,
            phone?: string,
            birth?: string,
            genderId?: number,
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
                }
            }
        });
    }

    @Delete(':userId')
    deleteUser(
        @Param('userId') id: string
    ): Promise<UsersModel> {
        return this.usersService.deleteUser({id: Number(id)})
    }
}