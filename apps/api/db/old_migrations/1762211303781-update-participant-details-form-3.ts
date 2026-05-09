import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateParticipantDetailsForm31762211303781 implements MigrationInterface {
    name = 'UpdateParticipantDetailsForm31762211303781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` CHANGE \`foodAllergy\` \`foodAllergy\` varchar(255) NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` CHANGE \`nonFoodAllergy\` \`nonFoodAllergy\` varchar(255) NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` CHANGE \`illnessOrDisability\` \`illnessOrDisability\` varchar(255) NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`participant-details\` CHANGE \`illnessOrDisability\` \`illnessOrDisability\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` CHANGE \`nonFoodAllergy\` \`nonFoodAllergy\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`participant-details\` CHANGE \`foodAllergy\` \`foodAllergy\` varchar(255) NOT NULL DEFAULT ''`);
    }

}
