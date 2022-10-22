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
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const member_entity_1 = require("./member.entity");
const business_errors_1 = require("../shared/errors/business-errors");
let MemberService = class MemberService {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async findAll() {
        return await this.memberRepository.find({
            loadRelationIds: true,
        });
    }
    async findOne(id) {
        const Member = await this.memberRepository.findOne({
            where: { id },
            loadRelationIds: true,
        });
        if (!Member)
            throw new business_errors_1.BusinessLogicException('The Member with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        else
            return Member;
    }
    async create(memberDTO) {
        if (!memberDTO.email.includes('@')) {
            throw new business_errors_1.BusinessLogicException('The email must contain the "@" character', business_errors_1.BusinessError.BAD_REQUEST);
        }
        const member = new member_entity_1.Member();
        member.name = memberDTO.name;
        member.email = memberDTO.email;
        member.dateOfBirth = memberDTO.dateOfBirth;
        return await this.memberRepository.save(member);
    }
    async update(id, memberDTO) {
        if (!memberDTO.email.includes('@')) {
            throw new business_errors_1.BusinessLogicException('The email must contain the "@" character', business_errors_1.BusinessError.BAD_REQUEST);
        }
        const member = await this.memberRepository.findOne({
            where: { id },
        });
        if (!member)
            throw new business_errors_1.BusinessLogicException('The Member with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        member.name = memberDTO.name;
        member.email = memberDTO.email;
        member.dateOfBirth = memberDTO.dateOfBirth;
        await this.memberRepository.save(member);
        return member;
    }
    async delete(id) {
        const member = await this.memberRepository.findOne({
            where: { id },
        });
        if (!member)
            throw new business_errors_1.BusinessLogicException('The Member with the given id was not found', business_errors_1.BusinessError.NOT_FOUND);
        else
            return await this.memberRepository.remove(member);
    }
};
MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MemberService);
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map