import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateApplicationEntity1755527238032 implements MigrationInterface {
    name = 'UpdateApplicationEntity1755527238032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`emergencyContactFullName\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`emergencyContactPhoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`emergencyContactRelationship\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`fileCnieUrl\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`fileGradesUrl\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`fileSchoolCertificateUrl\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`hasPreviousMathMarocParticipations\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`previousMathMarocParticipations\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`universityName\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`universityType\``);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`highschool\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`averageGrade\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`mathAverageGrade\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`ranking\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`mathRanking\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`numberOfStudentsInClass\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`hasPreviousMTYMParticipations\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`previousMTYMParticipations\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`previousMTYMParticipations\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`hasPreviousMTYMParticipations\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`numberOfStudentsInClass\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`mathRanking\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`ranking\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`mathAverageGrade\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`averageGrade\``);
        await queryRunner.query(`ALTER TABLE \`applications\` DROP COLUMN \`highschool\``);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`universityType\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`universityName\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`previousMathMarocParticipations\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`hasPreviousMathMarocParticipations\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`fileSchoolCertificateUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`fileGradesUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`fileCnieUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`emergencyContactRelationship\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`emergencyContactPhoneNumber\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`applications\` ADD \`emergencyContactFullName\` varchar(255) NOT NULL DEFAULT ''`);
    }

}
