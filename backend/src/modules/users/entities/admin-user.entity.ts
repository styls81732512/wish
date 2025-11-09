import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    comment: '信箱',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    comment: '密碼',
  })
  password: string;

  @Column({
    type: 'varchar',
    comment: '名稱',
  })
  name: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '註冊時間',
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '更新時間',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    comment: '刪除時間',
    default: null,
  })
  deletedAt: Date;
}
