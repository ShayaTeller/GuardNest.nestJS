import { IsNumber, } from "class-validator";

export class CreateAssignDto {
    @IsNumber()
    shift_id: number;
    @IsNumber()
    solder_id: number

}