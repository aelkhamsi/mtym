import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTeamReviews1788699858619 implements MigrationInterface {
    name = 'UpdateTeamReviews1788699858619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_reviews" DROP COLUMN "intermediateReportScore"`);
        await queryRunner.query(`ALTER TABLE "team_reviews" ADD "intermediateReportScore1" integer`);
        await queryRunner.query(`ALTER TABLE "team_reviews" ADD "intermediateReportScore2" integer`);
        await queryRunner.query(`ALTER TABLE "team_reviews" ADD "intermediateReportScore3" integer`);
        await queryRunner.query(`ALTER TABLE "team_reviews" ADD "intermediateReportScore4" integer`);
        await queryRunner.query(`ALTER TABLE "team_reviews" ADD "aiSuspicionScore" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_reviews" DROP COLUMN "aiSuspicionScore"`);
        await queryRunner.query(`ALTER TABLE "team_reviews" DROP COLUMN "intermediateReportScore4"`);
        await queryRunner.query(`ALTER TABLE "team_reviews" DROP COLUMN "intermediateReportScore3"`);
        await queryRunner.query(`ALTER TABLE "team_reviews" DROP COLUMN "intermediateReportScore2"`);
        await queryRunner.query(`ALTER TABLE "team_reviews" DROP COLUMN "intermediateReportScore1"`);
        await queryRunner.query(`ALTER TABLE "team_reviews" ADD "intermediateReportScore" integer`);
    }

}
