import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeamMembershipHistory1788203792893 implements MigrationInterface {
    name = 'AddTeamMembershipHistory1788203792893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."team_memberships_joinedbyrole_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TYPE "public"."team_memberships_leftbyrole_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "team_memberships" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "teamId" integer NOT NULL, "teamName" character varying NOT NULL, "teamQuadrigram" character varying NOT NULL, "joinedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "leftAt" TIMESTAMP WITH TIME ZONE, "joinedByRole" "public"."team_memberships_joinedbyrole_enum", "joinedByEmail" character varying, "leftByRole" "public"."team_memberships_leftbyrole_enum", "leftByEmail" character varying, CONSTRAINT "PK_053171f713ec8a2f09ed58f08f7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "team_memberships"`);
        await queryRunner.query(`DROP TYPE "public"."team_memberships_leftbyrole_enum"`);
        await queryRunner.query(`DROP TYPE "public"."team_memberships_joinedbyrole_enum"`);
    }

}
