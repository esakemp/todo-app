import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    length: 100,
  })
  text!: string

  @Column({
    default: false,
  })
  completed!: boolean

  @CreateDateColumn()
  createdAt!: Date
}
