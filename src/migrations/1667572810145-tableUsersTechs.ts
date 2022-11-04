import { MigrationInterface, QueryRunner } from "typeorm";

export class tableUsersTechs1667572810145 implements MigrationInterface {
    name = 'tableUsersTechs1667572810145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "profilePicture" TO "profile_picture"`);
        await queryRunner.query(`CREATE TABLE "users_techs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "techsId" uuid, CONSTRAINT "PK_bb509807eb5dd37ca2c5018b9ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_techs" ADD CONSTRAINT "FK_5033aaa321a3a33f5795604f6a1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_techs" ADD CONSTRAINT "FK_2aa2d767081e0c767a6e0e5f7b4" FOREIGN KEY ("techsId") REFERENCES "techs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_techs" DROP CONSTRAINT "FK_2aa2d767081e0c767a6e0e5f7b4"`);
        await queryRunner.query(`ALTER TABLE "users_techs" DROP CONSTRAINT "FK_5033aaa321a3a33f5795604f6a1"`);
        await queryRunner.query(`DROP TABLE "users_techs"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "profile_picture" TO "profilePicture"`);
    }

}
