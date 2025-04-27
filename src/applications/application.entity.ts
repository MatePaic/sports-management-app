// src/applications/entities/application.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Class } from 'src/classes/class.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'varchar',
    default: 'pending'
  })
  status: string; 
  
  @ManyToOne(() => User, user => user.applications)
  user: User;

  @ManyToOne(() => Class, sportsClass => sportsClass.applications)
  class: Class;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}