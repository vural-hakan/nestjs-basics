import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDb1703085322953 implements MigrationInterface {
  name = 'InitialDb1703085322953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fixtures" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "home_team" character varying NOT NULL, "away_team" character varying NOT NULL, "fthg" integer NOT NULL, "ftag" integer NOT NULL, "referee" character varying NOT NULL, "season" character varying NOT NULL, "league" character varying NOT NULL, CONSTRAINT "PK_a84e62c0b5acf494007959e67e6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "fixtures"`);
  }
}
