import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPresentationUpload1790807444074 implements MigrationInterface {
    name = 'AddPresentationUpload1790807444074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_reports" DROP CONSTRAINT "UQ_team_reports_team_type_problem"`);
        await queryRunner.query(`ALTER TYPE "public"."team_reports_reporttype_enum" RENAME TO "team_reports_reporttype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."team_reports_reporttype_enum" AS ENUM('INTERMEDIATE', 'FINAL', 'PRESENTATION')`);
        await queryRunner.query(`ALTER TABLE "team_reports" ALTER COLUMN "reportType" TYPE "public"."team_reports_reporttype_enum" USING "reportType"::"text"::"public"."team_reports_reporttype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."team_reports_reporttype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "team_reports" ADD CONSTRAINT "UQ_team_reports_team_type_problem" UNIQUE ("teamId", "reportType", "problemNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_reports" DROP CONSTRAINT "UQ_team_reports_team_type_problem"`);
        await queryRunner.query(`CREATE TYPE "public"."team_reports_reporttype_enum_old" AS ENUM('INTERMEDIATE', 'FINAL')`);
        await queryRunner.query(`ALTER TABLE "team_reports" ALTER COLUMN "reportType" TYPE "public"."team_reports_reporttype_enum_old" USING "reportType"::"text"::"public"."team_reports_reporttype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."team_reports_reporttype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."team_reports_reporttype_enum_old" RENAME TO "team_reports_reporttype_enum"`);
        await queryRunner.query(`ALTER TABLE "team_reports" ADD CONSTRAINT "UQ_team_reports_team_type_problem" UNIQUE ("reportType", "problemNumber", "teamId")`);
    }

}
