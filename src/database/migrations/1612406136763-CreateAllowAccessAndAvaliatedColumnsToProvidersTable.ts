import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllowAccessAndAvaliatedColumnsToProvidersTable1612406136763
  implements MigrationInterface {
  name = 'CreateAllowAccessAndAvaliatedColumnsToProvidersTable1612406136763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "provided_services" DROP CONSTRAINT "FK_43e77f69e9b0afca1e8d305c615"`,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" DROP COLUMN "aprovalStatus"`,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" ADD "allow_access" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" ADD "avaliated" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "provided_services" ADD CONSTRAINT "FK_43e77f69e9b0afca1e8d305c615" FOREIGN KEY ("service_type") REFERENCES "service_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "provided_services" DROP CONSTRAINT "FK_43e77f69e9b0afca1e8d305c615"`,
    );
    await queryRunner.query(`ALTER TABLE "providers" DROP COLUMN "avaliated"`);
    await queryRunner.query(
      `ALTER TABLE "providers" DROP COLUMN "allow_access"`,
    );
    await queryRunner.query(
      `ALTER TABLE "providers" ADD "aprovalStatus" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "provided_services" ADD CONSTRAINT "FK_43e77f69e9b0afca1e8d305c615" FOREIGN KEY ("service_type") REFERENCES "service_types"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
