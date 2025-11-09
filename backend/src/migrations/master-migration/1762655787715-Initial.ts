import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1762655787715 implements MigrationInterface {
  name = 'Initial1762655787715';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`admin_user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL COMMENT '信箱', \`password\` varchar(255) NOT NULL COMMENT '密碼', \`name\` varchar(255) NOT NULL COMMENT '名稱', \`createdAt\` datetime NOT NULL COMMENT '註冊時間' DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL COMMENT '更新時間' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` datetime(6) NULL COMMENT '刪除時間', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`appointment_services\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT '服務名稱', \`description\` text NOT NULL COMMENT '服務描述', \`price\` int NOT NULL COMMENT '實際價格', \`showTime\` int NOT NULL COMMENT '顯示時間', \`order\` int NOT NULL COMMENT '排序' DEFAULT '0', \`isRemove\` tinyint NOT NULL COMMENT '是否刪除' DEFAULT 0, \`isPublic\` tinyint NOT NULL COMMENT '是否公開於 Client' DEFAULT 1, \`createdAt\` datetime NOT NULL COMMENT '註冊時間' DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL COMMENT '更新時間' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`appointment_services\``);
    await queryRunner.query(`DROP TABLE \`admin_user\``);
  }
}
