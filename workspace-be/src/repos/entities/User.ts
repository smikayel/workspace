import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { Workspace } from "./Workspace";

export enum Roles {
  Admin = "Admin",
  User = "User",
}

export interface IUser {
  id: number;
  email: string;
  role: string;
  username: string | undefined;
  password: string;

}

@Entity()
@Unique(["email", "username"]) 
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public email!: string;

  @Column({
    type: "enum",
    enum: Roles,
    default: Roles.User,
  })
  public role!: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  public username!: string;

  @Column()
  public password!: string;

	@OneToMany(() => Workspace, (workspace) => workspace.user)
	public workspaces!: Workspace[];

}
