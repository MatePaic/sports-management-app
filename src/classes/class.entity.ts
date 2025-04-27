// src/classes/entities/class.entity.ts
import { Application } from 'src/applications/application.entity';
import { Sport } from 'src/sports/sport.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json')
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
  };

  @Column('int')
  duration: number; // Duration in minutes

  @ManyToOne(() => Sport, sport => sport.classes)
  sport: Sport;

  @OneToMany(() => Application, application => application.class)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}