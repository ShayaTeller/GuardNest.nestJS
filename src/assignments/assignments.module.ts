import { Module } from '@nestjs/common';
import { AssignmentsController ,} from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignments } from './assignment.Entity';
@Module({
  imports:[TypeOrmModule.forFeature([Assignments])],
  exports:[AssignmentsService],
  controllers: [AssignmentsController],
  providers: [AssignmentsService,AssignmentsService]
})

export class AssignmentsModule {}
