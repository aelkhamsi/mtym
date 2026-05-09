import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGuardianInfo1764537902232 implements MigrationInterface {
    name = 'AddGuardianInfo1764537902232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`guardianFullName\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`guardianPhoneNumber\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`guardianPhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`guardianFullName\``);
    }

}
