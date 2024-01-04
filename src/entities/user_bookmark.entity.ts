import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { FlashCard } from "./flash_card.entity";

@Entity("user_bookmarks")
export class UserBookmark {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.bookmarks)
    creator: User;

    @ManyToMany(() => FlashCard)
    @JoinTable({ name: "user_bookmark_flash_cards"})
    flashCards: FlashCard[];
}