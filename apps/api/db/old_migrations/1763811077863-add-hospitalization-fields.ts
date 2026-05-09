import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHospitalizationFields1763811077863 implements MigrationInterface {
    name = 'AddHospitalizationFields1763811077863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`hasBeenHospitalized\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`hospitalizationReasons\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`hospitalizationReasons\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`hasBeenHospitalized\``);
    }

}
