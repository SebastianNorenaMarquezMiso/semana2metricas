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
exports.ClubMemberController = void 0;
const common_1 = require("@nestjs/common");
const interceptor_1 = require("../shared/interceptors/interceptor");
const club_member_service_1 = require("./club-member.service");
let ClubMemberController = class ClubMemberController {
    constructor(clubMemberService) {
        this.clubMemberService = clubMemberService;
    }
    async addMemberToClub(clubId, memberId) {
        return await this.clubMemberService.associateClubMember(clubId, memberId);
    }
    async updateMembersFromClub(clubId, members) {
        return await this.clubMemberService.updateMemberFromClub(clubId, members);
    }
    async deleteMemberFromClub(clubId, memberId) {
        return await this.clubMemberService.deleteMemberFromClub(clubId, memberId);
    }
    async findMembersFromClub(clubId) {
        return await this.clubMemberService.getClubMembers(clubId);
    }
    async findMemberFromClub(clubId, memberId) {
        return await this.clubMemberService.getMemberClub(clubId, memberId);
    }
};
__decorate([
    (0, common_1.Post)(':clubId/members/:memberId'),
    __param(0, (0, common_1.Param)('clubId')),
    __param(1, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "addMemberToClub", null);
__decorate([
    (0, common_1.Put)(':clubId/members'),
    __param(0, (0, common_1.Param)('clubId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "updateMembersFromClub", null);
__decorate([
    (0, common_1.Delete)(':clubId/members/:memberId'),
    __param(0, (0, common_1.Param)('clubId')),
    __param(1, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "deleteMemberFromClub", null);
__decorate([
    (0, common_1.Get)(':clubId/members'),
    __param(0, (0, common_1.Param)('clubId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "findMembersFromClub", null);
__decorate([
    (0, common_1.Get)(':clubId/members/:memberId'),
    __param(0, (0, common_1.Param)('clubId')),
    __param(1, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "findMemberFromClub", null);
ClubMemberController = __decorate([
    (0, common_1.Controller)('clubs'),
    (0, common_1.UseInterceptors)(interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [club_member_service_1.ClubMemberService])
], ClubMemberController);
exports.ClubMemberController = ClubMemberController;
//# sourceMappingURL=club-member.controller.js.map