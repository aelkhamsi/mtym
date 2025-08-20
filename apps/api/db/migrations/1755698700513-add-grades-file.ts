import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGradesFile1755698700513 implements MigrationInterface {
  name = 'AddGradesFile1755698700513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`applications\` ADD \`fileGradesUrl\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`applications\` DROP COLUMN \`fileGradesUrl\``,
    );
  }
}
