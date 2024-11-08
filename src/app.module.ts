import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import 'dotenv/config';
import { join } from 'path';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.URL_MONGODB),
  ServeStaticModule.forRoot({
    serveRoot: '/upload',
    rootPath: join(__dirname, '..', 'upload')
  }),
  
  ProductsModule,
  
  EmailModule],
  providers: [EmailService],
})
export class AppModule {}
