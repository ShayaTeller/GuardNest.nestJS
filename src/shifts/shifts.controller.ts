import { Body, Controller, UseGuards, Post, Get, Param } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateShiftDto } from './dto/shift.Dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
@Controller('shifts')
export class ShiftsController {
    constructor(private shiftsService: ShiftsService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('commander')
    @Post()
    async createShift(@Body() ShiftDto: CreateShiftDto) {
        return await this.shiftsService.addShift(ShiftDto)
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('commander')
    @Get()
    async getAllShifts() {
        return this.shiftsService.getAllShifts()
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('commander')
    @Get('/:id')
    async getShiftById(@Param() params) {
        return await this.shiftsService.getShiftById(params.id)

    }
}
