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
exports.ClubService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const club_entity_1 = require("./club.entity");
const business_errors_1 = require("../shared/errors/business-errors");
let ClubService = class ClubService {
    constructor(clubRepository) {
        this.clubRepository = clubRepository;
    }
    async findAll() {
        return await this.clubRepository.find({
            loadRelationIds: true,
        });
    }
    async findOne(id) {
        const Club = await this.clubRepository.findOne({
            where: { id },
            loadRelationIds: true,
        });
        if (!Club)
            throw new business_errors_1.BusinessLogicException('The Club with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        else
            return Club;
    }
    async create(clubDTO) {
        if (clubDTO.description.length > 100) {
            throw new business_errors_1.BusinessLogicException('The description cannot exceed 100 characters', business_errors_1.BusinessError.BAD_REQUEST);
        }
        const club = new club_entity_1.Club();
        club.name = clubDTO.name;
        club.description = clubDTO.description;
        club.foundationDate = clubDTO.foundationDate;
        club.photo = clubDTO.photo;
        return await this.clubRepository.save(club);
    }
    async update(id, clubDTO) {
        if (clubDTO.description.length > 100) {
            throw new business_errors_1.BusinessLogicException('The description cannot exceed 100 characters', business_errors_1.BusinessError.BAD_REQUEST);
        }
        const club = await this.clubRepository.findOne({
            where: { id },
        });
        if (!club)
            throw new business_errors_1.BusinessLogicException('The Club with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        club.name = clubDTO.name;
        club.description = clubDTO.description;
        club.foundationDate = clubDTO.foundationDate;
        club.photo = clubDTO.photo;
        await this.clubRepository.save(club);
        return club;
    }
    async delete(id) {
        const club = await this.clubRepository.findOne({
            where: { id },
        });
        if (!club)
            throw new business_errors_1.BusinessLogicException('The Club with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        else
            return await this.clubRepository.remove(club);
    }
};
ClubService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(club_entity_1.Club)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClubService);
exports.ClubService = ClubService;
//# sourceMappingURL=club.service.js.map