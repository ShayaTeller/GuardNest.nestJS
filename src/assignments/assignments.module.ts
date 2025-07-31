import { Module } from '@nestjs/common';
import { AssignmentsController ,} from './assignments.controller';
import { assignmentsService } from './assignments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignments } from './assignment.Entity';
@Module({
  imports:[TypeOrmModule.forFeature([Assignments])],
  exports:[assignmentsService],
  controllers: [AssignmentsController],
  providers: [assignmentsService]
})

export class AssignmentsModule {}
