import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEssentialTablesAndRelations1610924382502
  implements MigrationInterface {
  name = 'CreateEssentialTablesAndRelations1610924382502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "providers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "service_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "service_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1dc93417a097cdee3491f39d7cc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "provided_services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "service_type" uuid NOT NULL, "provider_id" uuid NOT NULL, "velue" money NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5c8fbcec073614e8cd7c0af0ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "provided_services" ADD CONSTRAINT "FK_43e77f69e9b0afca1e8d305c615" FOREIGN KEY ("service_type") REFERENCES "service_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "provided_services" ADD CONSTRAINT "FK_4acdce23f984fbf2cd7953e07ee" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "provided_services" DROP CONSTRAINT "FK_4acdce23f984fbf2cd7953e07ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "provided_services" DROP CONSTRAINT "FK_43e77f69e9b0afca1e8d305c615"`,
    );
    await queryRunner.query(`DROP TABLE "provided_services"`);
    await queryRunner.query(`DROP TABLE "service_types"`);
    await queryRunner.query(`DROP TABLE "providers"`);
    await queryRunner.query(`DROP TABLE "admins"`);
  }
}
