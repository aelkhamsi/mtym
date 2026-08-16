import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApplicationReviews1785859117899 implements MigrationInterface {
    name = 'AddApplicationReviews1785859117899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."applications_reviews_identitycheck_enum" AS ENUM('YES', 'NO', 'NOT_SURE')`);
        await queryRunner.query(`CREATE TYPE "public"."applications_reviews_levelcheck_enum" AS ENUM('YES', 'NO', 'NOT_SURE')`);
        await queryRunner.query(`CREATE TYPE "public"."applications_reviews_citycheck_enum" AS ENUM('YES', 'CHANGED', 'NOT_SURE')`);
        await queryRunner.query(`CREATE TYPE "public"."applications_reviews_picturecheck_enum" AS ENUM('YES', 'NO', 'NOT_SURE')`);
        await queryRunner.query(`CREATE TABLE "applications_reviews" ("id" SERIAL NOT NULL, "reviewerId" character varying, "identityCheck" "public"."applications_reviews_identitycheck_enum", "levelCheck" "public"."applications_reviews_levelcheck_enum", "cityCheck" "public"."applications_reviews_citycheck_enum", "updatedCity" character varying, "pictureCheck" "public"."applications_reviews_picturecheck_enum", "comment" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "applicationId" integer NOT NULL, CONSTRAINT "REL_ed4d7c8ea87a9ad57f90326933" UNIQUE ("applicationId"), CONSTRAINT "PK_0232941cbae118082aff2276ef8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "applications_reviews" ADD CONSTRAINT "FK_ed4d7c8ea87a9ad57f90326933a" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications_reviews" DROP CONSTRAINT "FK_ed4d7c8ea87a9ad57f90326933a"`);
        await queryRunner.query(`DROP TABLE "applications_reviews"`);
        await queryRunner.query(`DROP TYPE "public"."applications_reviews_picturecheck_enum"`);
        await queryRunner.query(`DROP TYPE "public"."applications_reviews_citycheck_enum"`);
        await queryRunner.query(`DROP TYPE "public"."applications_reviews_levelcheck_enum"`);
        await queryRunner.query(`DROP TYPE "public"."applications_reviews_identitycheck_enum"`);
    }

}
