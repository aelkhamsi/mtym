import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCodeOfConduct1790434660310 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "applications" ADD "codeOfConductUrl" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "codeOfConductUrl"`);
  }
}
