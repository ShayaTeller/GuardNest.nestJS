import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from './shift.entity';
import { Repository } from 'typeorm';
import {creatShiftDto} from './dto/shift.Dto'
@Injectable()
export class ShiftsService {
    constructor(
        @InjectRepository(Shift)
        private shiftRepo: Repository<Shift>) { }



    async addShift(ShiftDto:creatShiftDto){
      
        const shift = await this.shiftRepo.create({
            startTime:ShiftDto.startTime,
            endTime:ShiftDto.endTime,
            location:ShiftDto.location
        })
        return await this.shiftRepo.save(shift)
    }

    async getAllShifts(){
        return await this.shiftRepo.find();
    }

    async getShiftById(paramsId){
        return await this.shiftRepo.find({where:{id:paramsId}});
    }

}