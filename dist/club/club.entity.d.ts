import { Member } from '../member/member.entity';
export declare class Club {
    id: string;
    name: string;
    foundationDate: Date;
    description: string;
    photo: string;
    members: Member[];
}
