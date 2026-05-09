import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateParticipantDetailsForm91762374339579 implements MigrationInterface {
    name = 'UpdateParticipantDetailsForm91762374339579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`filePhotoUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` ADD \`fileParentalAuthorizationUrl\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`fileParentalAuthorizationUrl\``);
        await queryRunner.query(`ALTER TABLE \`participant-details\` DROP COLUMN \`filePhotoUrl\``);
    }

}
