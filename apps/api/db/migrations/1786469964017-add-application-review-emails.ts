import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1786469964017 implements MigrationInterface {
    name = 'Migrations1786469964017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN IF EXISTS "assignedAdminId"`);
        await queryRunner.query(`ALTER TABLE "applications_reviews" ADD "emails" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications_reviews" DROP COLUMN "emails"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "assignedAdminId" character varying`);
    }

}
