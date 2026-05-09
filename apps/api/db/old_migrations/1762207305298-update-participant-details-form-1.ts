import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateParticipantDetailsForm11762207305298 implements MigrationInterface {
    name = 'UpdateParticipantDetailsForm11762207305298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9738a2741dc47adb59bd369ea1\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`illnessOrDisability\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`isOnMedication\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`medication\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`specialAccommodations\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`specialAccommodations\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`medication\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`isOnMedication\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`illnessOrDisability\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_9738a2741dc47adb59bd369ea1\` ON \`users\` (\`participantDetailsId\`)`);
    }

}
