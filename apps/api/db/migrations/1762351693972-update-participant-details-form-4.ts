import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateParticipantDetailsForm41762351693972 implements MigrationInterface {
    name = 'UpdateParticipantDetailsForm41762351693972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`gender\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`haveRoommatePreference\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`firstRoommateId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD UNIQUE INDEX \`IDX_ce2980acd943ea7ee86cafc9bf\` (\`firstRoommateId\`)`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`secondRoommateId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD UNIQUE INDEX \`IDX_891373a52d14ff657ccfa6ef48\` (\`secondRoommateId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ce2980acd943ea7ee86cafc9bf\` ON \`participant-details\` (\`firstRoommateId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_891373a52d14ff657ccfa6ef48\` ON \`participant-details\` (\`secondRoommateId\`)`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD CONSTRAINT \`FK_ce2980acd943ea7ee86cafc9bf6\` FOREIGN KEY (\`firstRoommateId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD CONSTRAINT \`FK_891373a52d14ff657ccfa6ef48b\` FOREIGN KEY (\`secondRoommateId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP FOREIGN KEY \`FK_891373a52d14ff657ccfa6ef48b\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP FOREIGN KEY \`FK_ce2980acd943ea7ee86cafc9bf6\``);
        await queryRunner.query(`DROP INDEX \`REL_891373a52d14ff657ccfa6ef48\` ON \`participant-details\``);
        await queryRunner.query(`DROP INDEX \`REL_ce2980acd943ea7ee86cafc9bf\` ON \`participant-details\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP INDEX \`IDX_891373a52d14ff657ccfa6ef48\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`secondRoommateId\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP INDEX \`IDX_ce2980acd943ea7ee86cafc9bf\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`firstRoommateId\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`haveRoommatePreference\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`gender\``);
    }

}
