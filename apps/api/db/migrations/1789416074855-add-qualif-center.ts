import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQualifCenter1789416074855 implements MigrationInterface {
    name = 'AddQualifCenter1789416074855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."teams_qualifcenter_enum" AS ENUM('casablanca', 'rabat', 'martil', 'benguerir', 'agadir', 'fez', 'oujda', 'online')`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "qualifCenter" "public"."teams_qualifcenter_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "qualifCenter"`);
        await queryRunner.query(`DROP TYPE "public"."teams_qualifcenter_enum"`);
    }

}
