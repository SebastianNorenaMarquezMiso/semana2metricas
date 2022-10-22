import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { MemberDTO } from './member.dto';
export declare class MemberService {
    private readonly memberRepository;
    constructor(memberRepository: Repository<Member>);
    findAll(): Promise<MemberDTO[]>;
    findOne(id: string): Promise<MemberDTO>;
    create(memberDTO: MemberDTO): Promise<MemberDTO>;
    update(id: string, memberDTO: MemberDTO): Promise<MemberDTO>;
    delete(id: string): Promise<Member>;
}
