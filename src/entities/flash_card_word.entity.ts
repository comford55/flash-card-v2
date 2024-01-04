import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FlashCard } from "./flash_card.entity";
import { UserOpenedFlashCard } from "./user_opened_flash_card.entity";

@Entity("flash_card_words")
export class FlashCardWord {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    word: string;

    @Column()
    expansion: string;

    @Column({ nullable: true })
    partOfSpeech: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => FlashCard, (flashCard) => flashCard.words)
    flashCard: FlashCard;

    @OneToMany(() => UserOpenedFlashCard, (opened) => opened.flashCard)
    openedFlashcards: UserOpenedFlashCard[];
}