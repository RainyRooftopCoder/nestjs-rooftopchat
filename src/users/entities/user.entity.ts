import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('USERS')
export class User {
  @PrimaryColumn({ name: 'EMAIL', length: 50 })
  email: string;

  @Column({ name: 'NICKNAME', length: 50 })
  nickname: string;

  @Column({ name: 'PASSWORD', type: 'char', length: 200 })
  password: string;

  @Column({ name: 'REG_DATE', type: 'timestamp without time zone' })
  regDate: Date;

  @Column({ name: 'MODI_DATE', type: 'timestamp without time zone' })
  modiDate: Date;

  @Column({
    name: 'DEL_DATE',
    type: 'timestamp without time zone',
    nullable: true,
  })
  delDate: Date;
}
