import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688063985184 implements MigrationInterface {
    name = 'InitialMigration1688063985184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adresses" ("id" SERIAL NOT NULL, "cep" character varying(45) NOT NULL, "city" character varying(45) NOT NULL, "state" character varying(11) NOT NULL, "street" character varying(45) NOT NULL, "number" character varying(45) NOT NULL, "complement" character varying(90), "user_id" integer, CONSTRAINT "REL_8549d17ae3508635410b4fa4fb" UNIQUE ("user_id"), CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "cpf" character varying(11) NOT NULL, "phone" character varying(45) NOT NULL, "birthdate" character varying(45) NOT NULL, "description" character varying NOT NULL, "seller" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, "resetToken" character varying(120), "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "image" character varying(250) NOT NULL, "advertisement_id" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "comment" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "advertisement_id" integer, "userId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advertisements" ("id" SERIAL NOT NULL, "brand" character varying(125) NOT NULL, "model" character varying(125) NOT NULL, "fuel" character varying(125) NOT NULL, "mileage" character varying(45) NOT NULL, "description" character varying(45) NOT NULL, "year" character varying(4) NOT NULL, "color" character varying(45) NOT NULL, "table_price" numeric NOT NULL, "price" numeric NOT NULL, "cover_image" character varying(250) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "user_id" integer, CONSTRAINT "PK_4818a08332624787e5b2bf82302" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_8549d17ae3508635410b4fa4fb1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_2d41e4238f2daa23ee3ef9f0dcb" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_0ca705dc76b2d3a4961227422cc" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD CONSTRAINT "FK_6277b5b1c6ac26154f49ba2ef7c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP CONSTRAINT "FK_6277b5b1c6ac26154f49ba2ef7c"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_0ca705dc76b2d3a4961227422cc"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_2d41e4238f2daa23ee3ef9f0dcb"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_8549d17ae3508635410b4fa4fb1"`);
        await queryRunner.query(`DROP TABLE "advertisements"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
    }

}
