import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1685975307033 implements MigrationInterface {
    name = 'FirstMigration1685975307033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "table_price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "price" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "table_price" TYPE numeric`);
    }

}
