import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameStatusColumnOfPRoviders1612186363989
  implements MigrationInterface {
  name = 'RenameStatusColumnOfPRoviders1612186363989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "providers" RENAME COLUMN "status" TO "aprovalStatus"`,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" DROP COLUMN "aprovalStatus"`,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" ADD "aprovalStatus" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "providers" DROP COLUMN "aprovalStatus"`,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" ADD "aprovalStatus" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" RENAME COLUMN "aprovalStatus" TO "status"`,
    );
  }
}
