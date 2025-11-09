import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppointmentServices {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    comment: '服務名稱',
  })
  name: string;

  @Column({
    type: 'text',
    comment: '服務描述',
  })
  description: string;

  @Column({
    type: 'int',
    comment: '實際價格',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'int',
    comment: '顯示時間',
  })
  showTime: number;

  @Column({
    type: 'int',
    comment: '排序',
    default: 0,
  })
  order: number;

  @Column({
    type: 'boolean',
    comment: '是否刪除',
    default: false,
  })
  isRemove: boolean;

  @Column({
    type: 'boolean',
    comment: '是否公開於 Client',
    default: true,
  })
  isPublic: boolean;

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
}
