import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsFreeAgentToUsers1788369649229 implements MigrationInterface {
    name = 'AddIsFreeAgentToUsers1788369649229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isFreeAgent" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isFreeAgent"`);
    }

}
