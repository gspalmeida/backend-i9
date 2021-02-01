import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameColumnToProvidedService1612211944217
  implements MigrationInterface {
  name = 'AddNameColumnToProvidedService1612211944217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "provided_services" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "provided_services" DROP COLUMN "name"`,
    );
  }
}
