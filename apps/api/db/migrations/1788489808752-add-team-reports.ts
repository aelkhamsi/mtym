import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeamReports1788489808752 implements MigrationInterface {
    name = 'AddTeamReports1788489808752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."team_reports_reporttype_enum" AS ENUM('INTERMEDIATE', 'FINAL')`);
        await queryRunner.query(`CREATE TABLE "team_reports" ("id" SERIAL NOT NULL, "reportType" "public"."team_reports_reporttype_enum" NOT NULL, "problemNumber" integer NOT NULL, "fileUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "teamId" integer NOT NULL, CONSTRAINT "UQ_team_reports_team_type_problem" UNIQUE ("teamId", "reportType", "problemNumber"), CONSTRAINT "PK_4c2d7a04ec9065ccce292774102" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team_reports" ADD CONSTRAINT "FK_2570625ca83a5d1f4be0d9ecc20" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_reports" DROP CONSTRAINT "FK_2570625ca83a5d1f4be0d9ecc20"`);
        await queryRunner.query(`DROP TABLE "team_reports"`);
        await queryRunner.query(`DROP TYPE "public"."team_reports_reporttype_enum"`);
    }

}
