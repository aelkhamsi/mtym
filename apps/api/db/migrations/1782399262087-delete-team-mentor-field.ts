import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteTeamMentorField1782399262087 implements MigrationInterface {
    name = 'DeleteTeamMentorField1782399262087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "mentorFullname"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" ADD "mentorFullname" character varying NOT NULL DEFAULT ''`);
    }

}
