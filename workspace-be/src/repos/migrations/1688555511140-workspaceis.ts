import { MigrationInterface, QueryRunner } from "typeorm";

export class workspaceis1688555511140 implements MigrationInterface {
    name = 'workspaceis1688555511140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workspace" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workspace"`);
    }

}
