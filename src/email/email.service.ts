import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { Email } from './email.entity';
import 'dotenv/config'

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
        user: 'mailingprueba61@gmail.com',
        pass: 'bgrroqifncmvzxzk',
        },
        tls: {
            rejectUnauthorized: false // Ignorar los errores de certificado
        }
    })

    async sendEmailContact(data: any): Promise<{success: boolean, message: string}>{
    
        
        const mailOptions = {
            from :'mailingprueba61@gmail.com',
            to: 'gabriel.m.ledesma96@gmail.com',
            subject: 'Nueva consulta',
            html:`
                <div>
                    <h4>Nombre: ${data.name} </h4>
                    <h4>Email: ${data.email} </h4>
                    <h4>Telefono: ${data.phone} </h4>
                    <h4> Mensaje: </h4>
                    <p> ${data.message} </p>
                </div>`
        }
        
        console.log(await this.transporter.sendMail(mailOptions));
        try {
            const info = await this.transporter.sendMail(mailOptions)
            
            if(!info){
                return {success: false, message: 'Error sending an email'}
            } else {
                return {success: true, message: 'Send email successfully'}
            }
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
}
