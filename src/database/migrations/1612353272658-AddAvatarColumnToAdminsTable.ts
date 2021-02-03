import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvatarColumnToAdminsTable1612353272658
  implements MigrationInterface {
  name = 'AddAvatarColumnToAdminsTable1612353272658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admins" ADD "avatar" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "avatar"`);
  }
}
