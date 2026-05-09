import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateParticipantDetailsForm81762373743744 implements MigrationInterface {
    name = 'UpdateParticipantDetailsForm81762373743744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`talentDescription\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`talentDescription\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`talentDescription\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`talentDescription\` varchar(255) NOT NULL DEFAULT ''`);
    }

}
