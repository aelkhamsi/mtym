import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1786475626005 implements MigrationInterface {
    name = 'HandleTimezonesCreatedUpdatedAt1786475626005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tables = ['applications_status', 'applications_reviews', 'applications'];
        const columns = ['createdAt', 'updatedAt'];

        for (const table of tables) {
            for (const column of columns) {
                await queryRunner.query(`
                    ALTER TABLE "${table}"
                    ALTER COLUMN "${column}" TYPE TIMESTAMP WITH TIME ZONE
                    USING "${column}" AT TIME ZONE 'UTC'
                `);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tables = ['applications_status', 'applications_reviews', 'applications'];
        const columns = ['createdAt', 'updatedAt'];

        for (const table of tables) {
            for (const column of columns) {
                await queryRunner.query(`
                    ALTER TABLE "${table}"
                    ALTER COLUMN "${column}" TYPE TIMESTAMP
                `);
            }
        }
    }
}