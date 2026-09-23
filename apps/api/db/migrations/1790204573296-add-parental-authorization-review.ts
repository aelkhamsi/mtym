import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParentalAuthorizationReview1790204573296 implements MigrationInterface {
    name = 'AddParentalAuthorizationReview1790204573296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."applications_reviews_parentalauthorizationcheck_enum" AS ENUM('VALID', 'NOT_VALID', 'WRONG_CENTER')`);
        await queryRunner.query(`ALTER TABLE "applications_reviews" ADD "parentalAuthorizationCheck" "public"."applications_reviews_parentalauthorizationcheck_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications_reviews" DROP COLUMN "parentalAuthorizationCheck"`);
        await queryRunner.query(`DROP TYPE "public"."applications_reviews_parentalauthorizationcheck_enum"`);
    }
}
