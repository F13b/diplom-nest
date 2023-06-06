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
}
