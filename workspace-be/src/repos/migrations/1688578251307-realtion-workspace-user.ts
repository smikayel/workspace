import { MigrationInterface, QueryRunner } from "typeorm";

export class realtionWorkspaceUser1688578251307 implements MigrationInterface {
    name = 'realtionWorkspaceUser1688578251307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "workspace" ADD CONSTRAINT "FK_b48532fc84800d41cfee110682c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" DROP CONSTRAINT "FK_b48532fc84800d41cfee110682c"`);
        await queryRunner.query(`ALTER TABLE "workspace" DROP COLUMN "userId"`);
    }

}
