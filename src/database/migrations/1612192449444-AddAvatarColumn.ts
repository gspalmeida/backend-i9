import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAvatarColumn1612192449444 implements MigrationInterface {
    name = 'AddAvatarColumn1612192449444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "providers" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "providers" DROP COLUMN "avatar"`);
    }

}
