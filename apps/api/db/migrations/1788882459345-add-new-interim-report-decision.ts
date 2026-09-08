import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewInterimReportDecision1788882459345 implements MigrationInterface {
    name = 'AddNewInterimReportDecision1788882459345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."team_reviews_intermediatereportdecision_enum" RENAME TO "team_reviews_intermediatereportdecision_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."team_reviews_intermediatereportdecision_enum" AS ENUM('PASS', 'FAIL', 'PERM_FAIL', 'NOT_SURE')`);
        await queryRunner.query(`ALTER TABLE "team_reviews" ALTER COLUMN "intermediateReportDecision" TYPE "public"."team_reviews_intermediatereportdecision_enum" USING "intermediateReportDecision"::"text"::"public"."team_reviews_intermediatereportdecision_enum"`);
        await queryRunner.query(`DROP TYPE "public"."team_reviews_intermediatereportdecision_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."team_reviews_intermediatereportdecision_enum_old" AS ENUM('PASS', 'FAIL', 'NOT_SURE')`);
        await queryRunner.query(`ALTER TABLE "team_reviews" ALTER COLUMN "intermediateReportDecision" TYPE "public"."team_reviews_intermediatereportdecision_enum_old" USING "intermediateReportDecision"::"text"::"public"."team_reviews_intermediatereportdecision_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."team_reviews_intermediatereportdecision_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."team_reviews_intermediatereportdecision_enum_old" RENAME TO "team_reviews_intermediatereportdecision_enum"`);
    }

}
