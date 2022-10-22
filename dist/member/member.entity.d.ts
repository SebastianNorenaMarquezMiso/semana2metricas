import { Club } from 'src/club/club.entity';
export declare class Member {
    id: string;
    name: string;
    email: string;
    dateOfBirth: Date;
    clubs: Club[];
}
