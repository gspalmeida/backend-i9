import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDueDateColumnToProvidedService1612213247742
  implements MigrationInterface {
  name = 'AddDueDateColumnToProvidedService1612213247742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "provided_services" ADD "due_date" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "provided_services" DROP COLUMN "due_date"`,
    );
  }
}
