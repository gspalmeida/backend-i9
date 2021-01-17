import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatusColumnOnProvidersTable1610927474406 implements MigrationInterface {
    name = 'AddStatusColumnOnProvidersTable1610927474406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "providers" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "providers" DROP COLUMN "status"`);
    }

}
