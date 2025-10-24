import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Plugin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isEnabled: boolean;
}
