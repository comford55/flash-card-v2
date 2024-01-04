import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { FlashCard } from "./flash_card.entity";

@Entity("user_quiz_results")
export class UserQuizResult {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    correct: number;

    @Column()
    incorrect: number;

    @ManyToOne(() => User, (user) => user.quizResults)
    user: User;

    @ManyToOne(() => FlashCard, (flashCard) => flashCard.quizResults)
    flashCard: FlashCard;
}