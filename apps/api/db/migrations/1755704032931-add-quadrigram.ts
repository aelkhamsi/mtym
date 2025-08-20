import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuadrigram1755704032931 implements MigrationInterface {
  name = 'AddQuadrigram1755704032931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`teams\` ADD \`quadrigram\` varchar(255) NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`teams\` DROP COLUMN \`quadrigram\``);
  }
}
