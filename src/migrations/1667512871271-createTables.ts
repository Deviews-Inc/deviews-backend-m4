import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667512871271 implements MigrationInterface {
    name = 'createTables1667512871271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "techs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tech_name" character varying NOT NULL, CONSTRAINT "PK_8ab2729ee26c5893090fb7b1b2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fires_posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_72eae381c7f8077d32a233f07c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(140) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying(120) NOT NULL, "bio" character varying NOT NULL, "profilePicture" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fires_comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "commentsId" uuid, CONSTRAINT "PK_670b81d64a352cca3aa0cc1a281" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_techs_techs" ("usersId" uuid NOT NULL, "techsId" uuid NOT NULL, CONSTRAINT "PK_c1e6d902b091e18115da63c55e6" PRIMARY KEY ("usersId", "techsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9b6a3bc06e34bd82f904aec6e1" ON "users_techs_techs" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a624c6a82857b2e4b0fb889c9" ON "users_techs_techs" ("techsId") `);
        await queryRunner.query(`ALTER TABLE "fires_posts" ADD CONSTRAINT "FK_886fe0171db3c2599746385b8c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fires_posts" ADD CONSTRAINT "FK_b60f47447caaaf06d8f63c4b2a0" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fires_comments" ADD CONSTRAINT "FK_2bb47e3d015d1ebae068ff86bcc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fires_comments" ADD CONSTRAINT "FK_8b3b3dce7debb351b8df285ff8a" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_techs_techs" ADD CONSTRAINT "FK_9b6a3bc06e34bd82f904aec6e11" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_techs_techs" ADD CONSTRAINT "FK_8a624c6a82857b2e4b0fb889c91" FOREIGN KEY ("techsId") REFERENCES "techs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_techs_techs" DROP CONSTRAINT "FK_8a624c6a82857b2e4b0fb889c91"`);
        await queryRunner.query(`ALTER TABLE "users_techs_techs" DROP CONSTRAINT "FK_9b6a3bc06e34bd82f904aec6e11"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "fires_comments" DROP CONSTRAINT "FK_8b3b3dce7debb351b8df285ff8a"`);
        await queryRunner.query(`ALTER TABLE "fires_comments" DROP CONSTRAINT "FK_2bb47e3d015d1ebae068ff86bcc"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "fires_posts" DROP CONSTRAINT "FK_b60f47447caaaf06d8f63c4b2a0"`);
        await queryRunner.query(`ALTER TABLE "fires_posts" DROP CONSTRAINT "FK_886fe0171db3c2599746385b8c9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a624c6a82857b2e4b0fb889c9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9b6a3bc06e34bd82f904aec6e1"`);
        await queryRunner.query(`DROP TABLE "users_techs_techs"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "fires_comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "fires_posts"`);
        await queryRunner.query(`DROP TABLE "techs"`);
    }

}
