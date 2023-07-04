import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688480992468 implements MigrationInterface {
    name = 'InitialMigration1688480992468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "table_price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "price" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "table_price" TYPE numeric`);
    }

}
