import { Body, Controller, ForbiddenException, InternalServerErrorException, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Email } from './email.entity';

@Controller('api/v1/email')
export class EmailController {
    constructor(private emailServices: EmailService){}

    @Post()
    async sendEmailContact(@Body() data: Email ): Promise<{success: boolean, message: string}>{
        try {
           const email = await  this.emailServices.sendEmailContact(data)
           if(email.success){
               return email
           } else {
                throw new ForbiddenException(email.message);
           }
        } catch (error) {
            throw new InternalServerErrorException(error.message); 
        }
    }
}
