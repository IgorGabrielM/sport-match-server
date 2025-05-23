import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  idRole: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany((type) => User, (user) => user.roles)
  users: User[];
}
