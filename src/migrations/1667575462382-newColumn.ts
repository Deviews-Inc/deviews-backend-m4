import { MigrationInterface, QueryRunner } from "typeorm";

export class newColumn1667575462382 implements MigrationInterface {
    name = 'newColumn1667575462382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "image"`);
    }

}
