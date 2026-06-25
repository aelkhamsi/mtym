import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteSchoolCertificateField1782383530932 implements MigrationInterface {
    name = 'DeleteSchoolCertificateField1782383530932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "fileSchoolCertificateUrl"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "fileSchoolCertificateUrl" character varying`);
    }

}
