import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShuttleField1763814522422 implements MigrationInterface {
    name = 'AddShuttleField1763814522422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`cityOfResidence\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`cityOfResidence\``);
    }

}
