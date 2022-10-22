"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmTestingConfig = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const club_entity_1 = require("../../club/club.entity");
const member_entity_1 = require("../../member/member.entity");
const TypeOrmTestingConfig = () => [
    typeorm_1.TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [member_entity_1.Member, club_entity_1.Club],
        synchronize: true,
        keepConnectionAlive: true,
    }),
    typeorm_1.TypeOrmModule.forFeature([member_entity_1.Member, club_entity_1.Club]),
];
exports.TypeOrmTestingConfig = TypeOrmTestingConfig;
//# sourceMappingURL=typeorm-testing-config.js.map