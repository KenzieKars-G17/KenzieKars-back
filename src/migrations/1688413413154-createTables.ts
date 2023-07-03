import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1688413413154 implements MigrationInterface {
    name = 'CreateTables1688413413154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "table_price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "complement"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "complement" character varying(90)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "complement"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "complement" character varying(45)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "description" character varying(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "table_price" TYPE numeric`);
    }

}
