import { MemberDTO } from './member.dto';
import { Member } from './member.entity';
import { MemberService } from './member.service';
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    getAllMembers(): Promise<MemberDTO[]>;
    getMemberById(memberId: string): Promise<MemberDTO>;
    createMember(memberDTO: MemberDTO): Promise<MemberDTO>;
    updateMemberById(MemberId: string, memberDTO: MemberDTO): Promise<MemberDTO>;
    deleteMember(memberId: string): Promise<Member>;
}
