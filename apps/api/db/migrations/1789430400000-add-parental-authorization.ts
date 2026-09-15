import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddParentalAuthorization1789430400000 implements MigrationInterface {
  name = 'AddParentalAuthorization1789430400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "applications" ADD "parentalAuthorizationUrl" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "parentalAuthorizationUrl"`);
  }
}
