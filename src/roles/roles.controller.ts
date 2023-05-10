import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import { RolesService } from './roles.service';
import {Roles} from "@prisma/client";

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  create(@Body() data: {name: string}): Promise<Roles> {
    return this.rolesService.createRole({name: data.name});
  }

  @Get()
  findAll(): Promise<Roles[]> {
    return this.rolesService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne({id: Number(id)});
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rolesService.deleteRole({id: Number(id)})
  }
}
