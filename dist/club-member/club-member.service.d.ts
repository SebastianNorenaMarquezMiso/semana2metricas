import { Repository } from 'typeorm';
import { Club } from '../club/club.entity';
import { Member } from '../member/member.entity';
import { ClubMemberDTO } from '../club-member/club-member.dto';
export declare class ClubMemberService {
    private readonly clubRepository;
    private readonly memberRepository;
    constructor(clubRepository: Repository<Club>, memberRepository: Repository<Member>);
    associateClubMember(clubId: string, membertId: string): Promise<Club>;
    updateMemberFromClub(clubId: string, members: ClubMemberDTO[]): Promise<Club[]>;
    getMemberClub(clubId: string, membertId: string): Promise<Member>;
    deleteMemberFromClub(clubId: string, membertId: string): Promise<Club>;
    getClubMembers(clubId: string): Promise<Club>;
}
