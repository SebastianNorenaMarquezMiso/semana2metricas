import { ClubDTO } from './club.dto';
import { Club } from './club.entity';
import { ClubService } from './club.service';
export declare class ClubController {
    private readonly clubService;
    constructor(clubService: ClubService);
    getAllClubs(): Promise<ClubDTO[]>;
    getClubById(ClubId: string): Promise<ClubDTO>;
    createClub(clubDTO: ClubDTO): Promise<ClubDTO>;
    updateClubById(clubId: string, clubDTO: ClubDTO): Promise<ClubDTO>;
    deleteClub(clubId: string): Promise<Club>;
}
