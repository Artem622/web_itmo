import { Module } from "@nestjs/common";
import { AppController } from "./controllers/app.controller";
import { AppService } from "./providers/app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { dbConf } from "../../conf/db.conf";
import { AuthModule } from "../auth/auth.module";
import { CordsModule } from "../cords/cords.module";
import {SocketService} from "../socket/socket.service";
import {JwtModule} from "@nestjs/jwt";
import {JwtOptionsModule} from "../auth/providers/jwt.options.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      ...dbConf,
    }),
    JwtModule.registerAsync({
      useClass: JwtOptionsModule,
    }),
    AuthModule,
    CordsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule {}
// tZV8liM_wyzpXkAQAAAD'
//SBKgNSHgxzAeAHmDAAAF