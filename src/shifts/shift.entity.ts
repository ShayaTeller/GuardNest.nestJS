import { BaseEntity, Column, Entity ,PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Shift extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    startTime: number

    @Column()
    endTime: number

    @Column()
    location: string

    
}