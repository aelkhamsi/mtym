import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeamStatus1787759553175 implements MigrationInterface {
    name = 'AddTeamStatus1787759553175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."teams_status_enum" AS ENUM('APPROVED', 'NEW', 'DECLINED', 'INCOMPLETE')`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "status" "public"."teams_status_enum" NOT NULL DEFAULT 'NEW'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."teams_status_enum"`);
    }

}
