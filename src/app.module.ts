import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://gabrielmledesma96:Lolalaloca1@cluster0.a4qufb6.mongodb.net/Bera+?retryWrites=true&w=majority'),
  ServeStaticModule.forRoot({
    serveRoot: '/products',
    rootPath: join(__dirname, '..', 'upload', 'products')
  }),
  
   ProductsModule,
  
   EmailModule],
  providers: [EmailService],
})
export class AppModule {}
