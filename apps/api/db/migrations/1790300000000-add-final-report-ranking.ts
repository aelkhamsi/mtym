import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFinalReportRanking1790300000000 implements MigrationInterface {
  name = 'AddFinalReportRanking1790300000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "teams" ADD "finalReportRanking" integer array');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "teams" DROP COLUMN "finalReportRanking"');
  }
}
