"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubMemberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const club_entity_1 = require("../club/club.entity");
const member_entity_1 = require("../member/member.entity");
const business_errors_1 = require("../shared/errors/business-errors");
let ClubMemberService = class ClubMemberService {
    constructor(clubRepository, memberRepository) {
        this.clubRepository = clubRepository;
        this.memberRepository = memberRepository;
    }
    async associateClubMember(clubId, membertId) {
        const member = await this.memberRepository.findOne({
            where: { id: membertId },
        });
        if (!member)
            throw new business_errors_1.BusinessLogicException('The member with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const club = await this.clubRepository.findOne({
            where: { id: clubId },
            relations: ['members'],
        });
        if (!club)
            throw new business_errors_1.BusinessLogicException('The category with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        club.members = [...club.members, member];
        return await this.clubRepository.save(club);
    }
    async updateMemberFromClub(clubId, members) {
        const club = await this.clubRepository.findOne({
            where: { id: clubId },
            relations: ['members'],
        });
        if (!club)
            throw new business_errors_1.BusinessLogicException('The Club with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const updatedMembers = [];
        for (const memberEntity of members) {
            const member = await this.memberRepository.findOne({
                where: { id: memberEntity.id },
            });
            if (!member)
                throw new business_errors_1.BusinessLogicException('The member with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
            club.members = [...club.members, member];
            updatedMembers.push(await this.clubRepository.save(club));
        }
        return updatedMembers;
    }
    async getMemberClub(clubId, membertId) {
        const member = await this.memberRepository.findOne({
            where: { id: membertId },
        });
        if (!member)
            throw new business_errors_1.BusinessLogicException('The member with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const club = await this.clubRepository.findOne({
            where: { id: clubId },
            relations: ['members'],
        });
        if (!club)
            throw new business_errors_1.BusinessLogicException('The category with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return member;
    }
    async deleteMemberFromClub(clubId, membertId) {
        const member = await this.memberRepository.findOne({
            where: { id: membertId },
        });
        if (!member)
            throw new business_errors_1.BusinessLogicException('The member with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        const club = await this.clubRepository.findOne({
            where: { id: clubId },
            relations: ['members'],
        });
        if (!club)
            throw new business_errors_1.BusinessLogicException('The category with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        club.members = club.members.filter((e) => e.id !== membertId);
        return await this.clubRepository.save(club);
    }
    async getClubMembers(clubId) {
        const club = await this.clubRepository.findOne({
            where: { id: clubId },
            relations: ['members'],
        });
        if (!club)
            throw new business_errors_1.BusinessLogicException('The category with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        return club;
    }
};
ClubMemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(club_entity_1.Club)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ClubMemberService);
exports.ClubMemberService = ClubMemberService;
//# sourceMappingURL=club-member.service.js.map