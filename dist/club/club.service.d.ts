import { Repository } from 'typeorm';
import { Club } from './club.entity';
import { ClubDTO } from './club.dto';
export declare class ClubService {
    private readonly clubRepository;
    constructor(clubRepository: Repository<Club>);
    findAll(): Promise<ClubDTO[]>;
    findOne(id: string): Promise<ClubDTO>;
    create(clubDTO: ClubDTO): Promise<ClubDTO>;
    update(id: string, clubDTO: ClubDTO): Promise<ClubDTO>;
    delete(id: string): Promise<Club>;
}
