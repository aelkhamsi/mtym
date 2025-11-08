import { MigrationInterface, QueryRunner } from "typeorm";

export class UserQualifiedAttribute1762641923247 implements MigrationInterface {
    name = 'UserQualifiedAttribute1762641923247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`qualified\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`qualified\``);
    }

}
