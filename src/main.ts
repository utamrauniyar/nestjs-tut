import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { getRepository } from 'typeorm';
import { SessionEntity } from './typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const sessionRepository = getRepository(SessionEntity);
  app.setGlobalPrefix('api');

  /**
   * session creating
   */
  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: 'SDFBHASHLDBCBFASHDBCBAJKDVCUAISHDIH',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      // store: new TypeormStore().connect(sessionRepository),
    }),
  );

  /**
   * integrate passport with session
   */
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5001);
}
bootstrap();
