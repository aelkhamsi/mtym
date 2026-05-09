import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkshopsField1763824712208 implements MigrationInterface {
    name = 'AddWorkshopsField1763824712208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`workshops\` varchar(255) NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`workshops\``);
    }

}
