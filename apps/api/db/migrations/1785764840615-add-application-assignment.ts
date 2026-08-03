import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApplicationAssignment1785764840615 implements MigrationInterface {
    name = 'AddApplicationAssignment1785764840615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "assignedAdminId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "assignedAdminId"`);
    }

}
