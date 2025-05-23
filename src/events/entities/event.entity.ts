import { Interest } from '../../interests/entities/interest.entity';
import { User } from '../../users/entities/user.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ type: 'datetime' })
    dateTime: Date;

    @Column({ nullable: false })
    location: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: true, type: "longtext" })
    image?: string;

    @ManyToMany(() => User)
    @JoinTable({
        name: 'event_participant',
        joinColumn: { name: 'idEvent', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'idUser', referencedColumnName: 'idUser' },
    })
    participants: User[];

    @ManyToMany(() => Interest)
    @JoinTable({
        name: 'event_interest',
        joinColumn: { name: 'idEvent', referencedColumnName: 'id' },
        inverseJoinColumn: {
            name: 'idInterest',
            referencedColumnName: 'idInterest',
        },
    })
    interests: Interest[];
}
