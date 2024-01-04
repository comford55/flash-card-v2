import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FlashCard } from "./flash_card.entity";
import { UserBookmark } from "./user_bookmark.entity";
import { UserOpenedFlashCard } from "./user_opened_flash_card.entity";
import { UserQuizResult } from "./user_quiz_result.entity";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => FlashCard, (flashCard) => flashCard.creator)
    flashCards: FlashCard[];

    @OneToMany(() => UserBookmark, (bookmark) => bookmark.creator)
    bookmarks: UserBookmark[];

    @OneToMany(() => UserOpenedFlashCard, (opened) => opened.user)
    openedFlashcards: UserOpenedFlashCard[];

    @OneToMany(() => UserQuizResult, (quiz) => quiz.user)
    quizResults: UserQuizResult[];
}