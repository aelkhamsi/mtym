import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateParticipantDetailsForm71762373693815 implements MigrationInterface {
    name = 'UpdateParticipantDetailsForm71762373693815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`haveTalent\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`talentDescription\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`talentDescription\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`haveTalent\``);
    }

}
