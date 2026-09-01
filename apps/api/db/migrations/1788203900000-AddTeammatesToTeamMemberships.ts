import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeammatesToTeamMemberships1788203900000 implements MigrationInterface {
    name = 'AddTeammatesToTeamMemberships1788203900000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_memberships" ADD "teammates" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_memberships" DROP COLUMN "teammates"`);
    }

}
