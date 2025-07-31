import { IsNumber, } from "class-validator";

export class CreateAssignmentDto  {
    @IsNumber()
    shift_id: number;
    @IsNumber()
    soldier_id: number

}