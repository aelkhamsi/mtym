import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateParticipantDetailsForm21762208552674 implements MigrationInterface {
    name = 'UpdateParticipantDetailsForm21762208552674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`needAssistance\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`needAssistance\``);
    }

}
