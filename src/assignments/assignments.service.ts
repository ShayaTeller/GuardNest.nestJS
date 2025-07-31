import { Injectable } from '@nestjs/common';
import { Assignments } from './assignment.Entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssignmentDto  } from './dto/assignment.Dto'


@Injectable()
export class assignmentsService {
    constructor(
        @InjectRepository(Assignments)
        private assignmentRepo: Repository<Assignments>) { }

    async createAssignment(Dto: CreateAssignmentDto , commanderId: number) {
        const newAssing = await this.assignmentRepo.create({
            shift_id: Dto.shift_id,
            soldier_id: Dto.soldier_id,
            assignedBy: commanderId,
        })
        return this.assignmentRepo.save(newAssing)
    }





}
