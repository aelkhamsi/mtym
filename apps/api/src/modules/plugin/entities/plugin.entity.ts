import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
// import { PluginManifest } from '@headstart/plugin-manager'

@Entity({ name: 'plugins' })
export class Plugin { // extends PluginManifest
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isEnabled: boolean;
}
