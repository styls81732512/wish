import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEmailAddUnique1762661273365 implements MigrationInterface {
  name = 'UserEmailAddUnique1762661273365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`admin_user\` ADD UNIQUE INDEX \`IDX_840ac5cd67be99efa5cd989bf9\` (\`email\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`admin_user\` DROP INDEX \`IDX_840ac5cd67be99efa5cd989bf9\``,
    );
  }
}
