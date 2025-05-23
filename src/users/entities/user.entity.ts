import { PostComment } from '../../post-comments/entities/post-comment.entity';
import { Interest } from '../../interests/entities/interest.entity';
import { Post } from '../../posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  birthdate?: Date;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @Column({ nullable: true })
  gender?: string;

  @Column({ default: 0 })
  points: number;

  @ManyToMany((type) => Interest, (interest) => interest.users)
  @JoinTable({
    name: 'user_interest',
    joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
    inverseJoinColumn: {
      name: 'idInterest',
      referencedColumnName: 'idInterest',
    },
  })
  interests: Interest[];

  @OneToMany((type) => Post, (post) => post.user)
  @JoinTable({
    name: 'post',
    joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'idPost', referencedColumnName: 'idPost' },
  })
  posts: Post[];

  @OneToMany((type) => PostComment, (postComment) => postComment.user)
  @JoinTable({
    name: 'post_comment',
    joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
    inverseJoinColumn: {
      name: 'idPostComment',
      referencedColumnName: 'idPostComment',
    },
  })
  comments: PostComment[];

  @ManyToMany((type) => Post, (post) => post.likes)
  @JoinTable({
    name: 'post_like',
    joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'idPost', referencedColumnName: 'idPost' },
  })
  likes: Post[];

  @ManyToMany((type) => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'idRole', referencedColumnName: 'idRole' },
  })
  roles: Role[];
}
