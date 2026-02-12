import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { TodosModule } from './todos/todos.module';
import { TimerMiddleware } from './middlewares/timer.middleware';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-todo'),
    TodosModule,
  ],
  // Note that we add the Exception Filter to the app here:
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimerMiddleware).forRoutes('*');
  }
}
