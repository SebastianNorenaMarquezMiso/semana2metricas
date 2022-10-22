import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Club } from '../club/club.entity';
@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dateOfBirth: Date;

  @ManyToMany(() => Club, (club) => club.members)
  clubs: Club[];
}
