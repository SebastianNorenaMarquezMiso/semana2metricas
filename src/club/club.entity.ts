import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from '../member/member.entity';

@Entity()
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  foundationDate: Date;

  @Column({ length: 100 })
  description: string;

  @Column()
  photo: string;

  @ManyToMany(() => Member, (member) => member.clubs)
  @JoinTable()
  members: Member[];
}
