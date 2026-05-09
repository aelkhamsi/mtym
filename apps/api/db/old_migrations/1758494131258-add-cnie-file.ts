import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCnieFile1758494131258 implements MigrationInterface {
  name = 'AddCnieFile1758494131258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`applications\` ADD \`fileCnieUrl\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`applications\` DROP COLUMN \`fileCnieUrl\``,
    );
  }
}
