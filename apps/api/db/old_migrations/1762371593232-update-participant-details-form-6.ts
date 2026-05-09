import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateParticipantDetailsForm61762371593232 implements MigrationInterface {
    name = 'UpdateParticipantDetailsForm61762371593232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`needDepartureShuttle\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`departureCity\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`needArrivalShuttle\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`arrivalCity\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`arrivalCity\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`needArrivalShuttle\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`departureCity\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`needDepartureShuttle\``);
    }

}
