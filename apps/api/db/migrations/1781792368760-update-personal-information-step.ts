import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePersonalInformationStep1781792368760 implements MigrationInterface {
    name = 'UpdatePersonalInformationStep1781792368760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "allergyOrMedication" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "guardianFullName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "guardianPhoneNumber" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "relationshipWithGuardian" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "allergyOrMedication"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "relationshipWithGuardian"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "guardianPhoneNumber"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "guardianFullName"`);
    }
}
