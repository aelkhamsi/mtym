import { FaqSchema } from '../../faq.schema'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'faq'})
export class FaqEntity implements FaqSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @CreateDateColumn()
  createdAt: Date;
}
