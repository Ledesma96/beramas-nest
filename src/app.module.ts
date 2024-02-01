import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import 'dotenv/config'

@Module({
  imports: [MongooseModule.forRoot(process.env.URL_MONGODB),
  ServeStaticModule.forRoot({
    serveRoot: '/products',
    rootPath: join(__dirname, '..', 'upload', 'products')
  }),
  
   ProductsModule,
  
   EmailModule],
  providers: [EmailService],
})
export class AppModule {}
