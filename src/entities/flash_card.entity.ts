import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FlashCardWord } from "./flash_card_word.entity";
import { User } from "./user.entity";
import { UserOpenedFlashCard } from "./user_opened_flash_card.entity";
import { UserQuizResult } from "./user_quiz_result.entity";

@Entity("flash_cards")
export class FlashCard {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.flashCards)
    creator: User;

    @OneToMany(() => FlashCardWord, (flashCardWord) => flashCardWord.flashCard, { cascade: true })
    words: FlashCardWord[];

    @OneToMany(() => UserOpenedFlashCard, (opened) => opened.flashCard)
    openedFlashcards: UserOpenedFlashCard[];

    @OneToMany(() => UserQuizResult, (quiz) => quiz.flashCard)
    quizResults: UserQuizResult[];
}