import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";

export interface IWorkspace {
    id: number;
    userid: number;
    name: string;
    slug: string;
  
  }

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn()
    public id!: number;
  
    @Column()
    public name!: string;

    @Column()
    public slug!: string;

    @ManyToOne(() => User, (user) => user.workspaces)
    public user!: User;
}
