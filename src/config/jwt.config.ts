import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        return {
            global: true,
            secret: configService.get('JWT_SECRET'),
            signOptions: {
                expiresIn: '5m',
            }
        }
    }
}