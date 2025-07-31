import { IsNumber, IsString, } from "class-validator"


export class creatShiftDto {

    @IsNumber()
    startTime: number;

    @IsNumber()
    endTime: number;

    @IsString()
    location: string;

}