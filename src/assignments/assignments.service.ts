import { Injectable } from '@nestjs/common';
import { Assignments } from './assignment.Entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssignDto } from './dto/assignment.Dto'


@Injectable()
export class AssignmentsService {
    constructor(
        @InjectRepository(Assignments)
        private assingnRepo: Repository<Assignments>) { }

    async createNewAssing(Dto: CreateAssignDto, commanderId: number) {
        const newAssing = await this.assingnRepo.create({
            shift_id: Dto.shift_id,
            solder_id: Dto.solder_id,
            assignedBy: commanderId,
        })
        return this.assingnRepo.save(newAssing)
    }





}
