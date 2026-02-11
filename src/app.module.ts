import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TimerMiddleware } from './middlewares/timer.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), TodosModule],
  controllers: [AppController, TodosController],
  providers: [AppService, TodosService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(TimerMiddleware).forRoutes('*');
    consumer.apply(TimerMiddleware).forRoutes('*');
  }
}
