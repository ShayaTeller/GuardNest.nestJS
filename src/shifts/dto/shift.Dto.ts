import { IsNumber, IsString, } from "class-validator"


export class CreateShiftDto {

    @IsNumber()
    startTime: number;

    @IsNumber()
    endTime: number;

    @IsString()
    location: string;

}