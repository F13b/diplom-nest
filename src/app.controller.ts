import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./users/users.service";
import {GendersService} from "./genders/genders.service";
import {Users as UserModel} from "@prisma/client";
import {connect} from "rxjs";
import {ApiExcludeEndpoint} from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(
      private readonly userService: UserService,
      private readonly genderService: GendersService,
  ) {}

  // @Post('user')
  // @ApiExcludeEndpoint()
  // async signupUser(
  //     @Body() userData: {
  //         email: string,
  //         name: string,
  //         lastname: string,
  //         phone: string,
  //         birth: string,
  //         genderId: number
  //     },
  // ): Promise<UserModel> {
  //     return this.userService.createUser({
  //         email: userData.email,
  //         name: userData.name,
  //         lastname: userData.lastname,
  //         phone: userData.phone,
  //         birth: new Date(userData.birth),
  //         Gender: {
  //             connect: {
  //                 id: userData.genderId
  //             }
  //         }
  //     });
  // }
}
