import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueTeamQuadrigram1785456000000 implements MigrationInterface {
    name = 'UniqueTeamQuadrigram1785456000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        /* Quadrigrams are stored upper-cased, but the index is built on
         * UPPER(quadrigram) so pre-existing rows in any case still collide.
         * Teams created before the field existed have an empty quadrigram and
         * are left out of the constraint. */
        await queryRunner.query(`UPDATE "teams" SET "quadrigram" = UPPER(TRIM("quadrigram"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_teams_quadrigram_upper" ON "teams" (UPPER("quadrigram")) WHERE "quadrigram" <> ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "UQ_teams_quadrigram_upper"`);
    }

}
