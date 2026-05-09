import { MigrationInterface, QueryRunner } from "typeorm";

export class InitParticipantDetailsForm1762097623839 implements MigrationInterface {
    name = 'InitParticipantDetailsForm1762097623839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`participant-details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL DEFAULT 'NOT_STARTED', \`foodAllergy\` varchar(255) NOT NULL DEFAULT '', \`nonFoodAllergy\` varchar(255) NOT NULL DEFAULT '', \`allergyPrecaution\` text NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_79fdf313dbf97865fc0ac90b46\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`participantDetailsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_9738a2741dc47adb59bd369ea1\` (\`participantDetailsId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_9738a2741dc47adb59bd369ea1\` ON \`users\` (\`participantDetailsId\`)`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD CONSTRAINT \`FK_79fdf313dbf97865fc0ac90b46a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_9738a2741dc47adb59bd369ea19\` FOREIGN KEY (\`participantDetailsId\`) REFERENCES \`participant-details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_9738a2741dc47adb59bd369ea19\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP FOREIGN KEY \`FK_79fdf313dbf97865fc0ac90b46a\``);
        await queryRunner.query(`DROP INDEX \`REL_9738a2741dc47adb59bd369ea1\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_9738a2741dc47adb59bd369ea1\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`participantDetailsId\``);
        await queryRunner.query(`DROP INDEX \`REL_79fdf313dbf97865fc0ac90b46\` ON \`participant-details\``);
        await queryRunner.query(`DROP TABLE \`participant-details\``);
    }

}
