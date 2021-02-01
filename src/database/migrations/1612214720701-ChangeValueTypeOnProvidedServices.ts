import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeValueTypeOnProvidedServices1612214720701 implements MigrationInterface {
    name = 'ChangeValueTypeOnProvidedServices1612214720701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provided_services" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "provided_services" ADD "value" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provided_services" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "provided_services" ADD "value" money NOT NULL`);
    }

}
