import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReanameColumnVelueToValue1612211766986
  implements MigrationInterface {
  name = 'ReanameColumnVelueToValue1612211766986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "provided_services" RENAME COLUMN "velue" TO "value"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "provided_services" RENAME COLUMN "value" TO "velue"`,
    );
  }
}
