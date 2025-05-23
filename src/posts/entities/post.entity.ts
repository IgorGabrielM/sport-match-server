import { PostComment } from "../../post-comments/entities/post-comment.entity";
import { Interest } from "../../interests/entities/interest.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    idPost: number;

    @Column({ length: 45 })
    title: string;

    @Column({ type: 'text' })
    text: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ nullable: true })
    commentsCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.posts)
    user: User;

    @ManyToMany(type => Interest, interest => interest.posts)
    public interests: Interest[];

    @OneToMany(type => PostComment, postComment => postComment.post)
    public comments: PostComment[];

    @ManyToMany(type => User, user => user.likes)
    public likes: User[];
}
