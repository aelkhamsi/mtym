import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateApplicationsUploadFields1781723130751 implements MigrationInterface {
    name = 'UpdateApplicationsUploadFields1781723130751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "fileRegulationsUrl"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "filePhotoUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "fileSchoolCertificateUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "fileSchoolCertificateUrl"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "filePhotoUrl"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "fileRegulationsUrl" character varying`);
    }
}
