import { ClubMemberService } from './club-member.service';
import { ClubMemberDTO } from '../club-member/club-member.dto';
export declare class ClubMemberController {
    private readonly clubMemberService;
    constructor(clubMemberService: ClubMemberService);
    addMemberToClub(clubId: string, memberId: string): Promise<import("../club/club.entity").Club>;
    updateMembersFromClub(clubId: string, members: ClubMemberDTO[]): Promise<import("../club/club.entity").Club[]>;
    deleteMemberFromClub(clubId: string, memberId: string): Promise<import("../club/club.entity").Club>;
    findMembersFromClub(clubId: string): Promise<import("../club/club.entity").Club>;
    findMemberFromClub(clubId: string, memberId: string): Promise<import("../member/member.entity").Member>;
}
