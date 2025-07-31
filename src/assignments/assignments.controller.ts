import { Body, Controller, Request, Post ,UseGuards} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignDto } from './dto/assignment.Dto'
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentservice: AssignmentsService) { }


    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('commander')
    @Post('new')
    async PostnewAssingment(@Body() Dto: CreateAssignDto, @Request() req) {
        return this.assignmentservice.createNewAssing(Dto, req.user.userId);
    }
}
