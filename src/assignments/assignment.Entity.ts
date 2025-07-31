import { Param } from "@nestjs/common";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";
import { Shift } from "src/shifts/shift.entity";

@Entity()
export class Assignments extends BaseEntity {

    @PrimaryGeneratedColumn()
    assignmentId: number

    @Column()
    shift_id: number;

    @Column()
    soldier_id: number

    
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    assignedAt: Date;

    @Column()
    assignedBy: number; 

    @ManyToOne(() => User)
    @JoinColumn({ name: 'soldier_id', referencedColumnName: 'id' })  // solderId מצביע על User.id
    user: User

    @ManyToOne(() => Shift)
    @JoinColumn({ name: 'shift_id', referencedColumnName: 'id' })
    shift: Shift





}