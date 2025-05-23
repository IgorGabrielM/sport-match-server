import { Post } from "../../posts/entities/post.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostComment {
    @PrimaryGeneratedColumn()
    idPostComment: number;

    @Column({ nullable: false })
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({ name: 'idPost', referencedColumnName: 'idPost', foreignKeyConstraintName: 'fk_post_comment_post' })
    post: Post;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser', foreignKeyConstraintName: 'fk_post_comment_user' })
    user: User;
}
