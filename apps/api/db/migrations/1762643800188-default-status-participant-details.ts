import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultStatusParticipantDetails1762643800188 implements MigrationInterface {
    name = 'DefaultStatusParticipantDetails1762643800188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'DRAFTED'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'NOT_STARTED'`);
    }

}
