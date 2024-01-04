import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm"
import { FlashCard } from "src/entities/flash_card.entity"
import { FlashCardWord } from "src/entities/flash_card_word.entity"
import { User } from "src/entities/user.entity"
import { UserBookmark } from "src/entities/user_bookmark.entity"
import { UserOpenedFlashCard } from "src/entities/user_opened_flash_card.entity"
import { UserQuizResult } from "src/entities/user_quiz_result.entity"

export const dbConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        entities: [User, FlashCard, FlashCardWord, UserBookmark, UserOpenedFlashCard, UserQuizResult],
        synchronize: true,
    })
}