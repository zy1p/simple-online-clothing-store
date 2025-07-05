import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DbService } from './db.service';
import { Env, ENV } from '@lib/env';
import { mongoose, getModelForClass } from '@typegoose/typegoose';

type ClassType = { new (...args: any[]): any };

export const MONGO_DB_CONNECTION = 'MONGO_DB_CONNECTION';

@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {
  static forRoot(options?: mongoose.ConnectOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: MONGO_DB_CONNECTION,
        inject: [ENV],
        useFactory: async (env: Env) =>
          await mongoose.connect(env.MONGODB_URI, options),
      },
    ];

    return {
      module: DbModule,
      providers,
      exports: providers,
      global: true,
    };
  }

  static forFeature(...models: ClassType[]): DynamicModule {
    const providers: Provider[] = models.map<Provider>((model) => ({
      provide: model.name,
      inject: [MONGO_DB_CONNECTION],
      useFactory: (mongoose?: mongoose.Mongoose) =>
        getModelForClass(model, { existingMongoose: mongoose }),
    }));

    return {
      module: DbModule,
      providers,
      exports: providers,
    };
  }
}
