import { Body, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { assignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/assignment.Dto'
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard'



@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentservice: assignmentsService) {
        console.log(assignmentsService)
        ;
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('commander')
    @Post('new')
    async createAssignment(@Body() Dto: CreateAssignmentDto, @Request() req) {
        return this.assignmentservice.createAssignment(Dto, req.user.userId);
    }
}
