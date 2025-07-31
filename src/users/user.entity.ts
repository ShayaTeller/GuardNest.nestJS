// users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userName: string;

  @Column()
  role: string;

  @Column()
  passwordHash: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
