import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeamReviews1788613483292 implements MigrationInterface {
    name = 'AddTeamReviews1788613483292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."team_reviews_intermediatereportdecision_enum" AS ENUM('PASS', 'FAIL', 'NOT_SURE')`);
        await queryRunner.query(`CREATE TABLE "team_reviews" ("id" SERIAL NOT NULL, "reviewerId" character varying, "intermediateReportScore" integer, "intermediateReportDecision" "public"."team_reviews_intermediatereportdecision_enum", "comment" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "teamId" integer NOT NULL, CONSTRAINT "REL_a698298bb577b84ea6b85865d0" UNIQUE ("teamId"), CONSTRAINT "PK_a87d776bc6f93a33057e9021a48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team_reviews" ADD CONSTRAINT "FK_a698298bb577b84ea6b85865d02" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_reviews" DROP CONSTRAINT "FK_a698298bb577b84ea6b85865d02"`);
        await queryRunner.query(`DROP TABLE "team_reviews"`);
        await queryRunner.query(`DROP TYPE "public"."team_reviews_intermediatereportdecision_enum"`);
    }

}
