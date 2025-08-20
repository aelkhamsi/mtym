import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeamTable1755700841866 implements MigrationInterface {
  name = 'CreateTeamTable1755700841866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`teams\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL DEFAULT '', \`slogan\` varchar(255) NOT NULL DEFAULT '', \`mentorFullname\` varchar(255) NOT NULL DEFAULT '', \`leaderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`teams-access-code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`accessCode\` varchar(255) NOT NULL DEFAULT '', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`teamId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`teamId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`teams\` ADD CONSTRAINT \`FK_6d5c85d3f2602450d1e615afae9\` FOREIGN KEY (\`leaderId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_d1803064187c8f38e57a9c4984c\` FOREIGN KEY (\`teamId\`) REFERENCES \`teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teams-access-code\` ADD CONSTRAINT \`FK_3d60c40a9dd17f35ba31cf30fa9\` FOREIGN KEY (\`teamId\`) REFERENCES \`teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`teams-access-code\` DROP FOREIGN KEY \`FK_3d60c40a9dd17f35ba31cf30fa9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_d1803064187c8f38e57a9c4984c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teams\` DROP FOREIGN KEY \`FK_6d5c85d3f2602450d1e615afae9\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`teamId\``);
    await queryRunner.query(`DROP TABLE \`teams-access-code\``);
    await queryRunner.query(`DROP TABLE \`teams\``);
  }
}
