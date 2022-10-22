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
exports.ClubController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const interceptor_1 = require("../shared/interceptors/interceptor");
const club_dto_1 = require("./club.dto");
const club_entity_1 = require("./club.entity");
const club_service_1 = require("./club.service");
let ClubController = class ClubController {
    constructor(clubService) {
        this.clubService = clubService;
    }
    async getAllClubs() {
        return await this.clubService.findAll();
    }
    async getClubById(ClubId) {
        return await this.clubService.findOne(ClubId);
    }
    async createClub(clubDTO) {
        const club = (0, class_transformer_1.plainToInstance)(club_entity_1.Club, clubDTO);
        return await this.clubService.create(club);
    }
    async updateClubById(clubId, clubDTO) {
        const club = (0, class_transformer_1.plainToInstance)(club_entity_1.Club, clubDTO);
        return await this.clubService.update(clubId, club);
    }
    async deleteClub(clubId) {
        return await this.clubService.delete(clubId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClubController.prototype, "getAllClubs", null);
__decorate([
    (0, common_1.Get)(':ClubId'),
    __param(0, (0, common_1.Param)('ClubId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClubController.prototype, "getClubById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [club_dto_1.ClubDTO]),
    __metadata("design:returntype", Promise)
], ClubController.prototype, "createClub", null);
__decorate([
    (0, common_1.Put)(':clubId'),
    __param(0, (0, common_1.Param)('clubId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, club_dto_1.ClubDTO]),
    __metadata("design:returntype", Promise)
], ClubController.prototype, "updateClubById", null);
__decorate([
    (0, common_1.Delete)(':clubId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('clubId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClubController.prototype, "deleteClub", null);
ClubController = __decorate([
    (0, common_1.Controller)('clubs'),
    (0, common_1.UseInterceptors)(interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [club_service_1.ClubService])
], ClubController);
exports.ClubController = ClubController;
//# sourceMappingURL=club.controller.js.map