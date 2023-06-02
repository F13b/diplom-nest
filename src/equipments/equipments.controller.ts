import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import {Equipment} from "@prisma/client";

@Controller('equipments')
export class EquipmentsController {
    constructor(private readonly equipmentsService: EquipmentsService) {}

    @Get()
    async findAll(): Promise<Equipment[]> {
        return this.equipmentsService.findAll({});
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Equipment> {
        return this.equipmentsService.findOne({id: Number(id)});
    }

    @Post('create')
    async createEquipment(@Body() data: {
      name: string
    }): Promise<Equipment> {
        return  this.equipmentsService.createEquipment({
            name: data.name
        });
    }

    @Patch(':id')
    async updateEquipment(
        @Param('id') id: string,
        @Body() data: {
            name?: string
        }
    ): Promise<Equipment> {
        return this.equipmentsService.update(
            {id: Number(id)},
            {
                name: data.name
            }
        )
    }

    @Delete(':id')
    async deleteEquipment(@Param('id') id: string): Promise<Equipment> {
        return this.equipmentsService.deleteEquipment({id: Number(id)})
    }
}
