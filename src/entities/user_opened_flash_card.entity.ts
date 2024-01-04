import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { FlashCard } from "./flash_card.entity";
import { FlashCardWord } from "./flash_card_word.entity";

@Entity("user_opened_flash_cards")
export class UserOpenedFlashCard {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.openedFlashcards)
    user: User;

    @ManyToOne(() => FlashCard, (flashCard) => flashCard.openedFlashcards)
    flashCard: FlashCard;

    @ManyToOne(() => FlashCardWord, (flashCardWord) => flashCardWord.openedFlashcards)
    flashCardWord: FlashCardWord;
}