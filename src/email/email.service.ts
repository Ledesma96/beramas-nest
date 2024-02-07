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
        user: 'beramassillones@gmail.com',
        pass: 'zouhvzsjddzverde',
        },
        tls: {
            rejectUnauthorized: false // Ignorar los errores de certificado
        }
    })

    async sendEmailContact(data: any): Promise<{success: boolean, message: string}>{
    
        const mailOptionsClients = {
            from: 'beramassillones@gmail.com',
            to: data.email,
            subject: '¡Bienvenido a Bera mas sillones',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenido a Bera mas sillones</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Mr+Dafoe&display=swap');
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #ff9800;
                        padding: 20px;
                        border-radius: 5px 5px 0 0;
                        text-align: center;
                    }
                    .header h1 {
                        margin: 0;
                        color: #fff;
                    }
                    .message {
                        background-color: #f9f9f9;
                        padding: 20px;
                        border-radius: 0 0 5px 5px;
                    }
                    .banner {
                        width: 100%;
                        height: auto;
                    }
                    .beramas {
                        font-family: 'Mr Dafoe', cursive;
                    }                    
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>¡Te damos la bienvenida a <span class="beramas">Beramas</span> sillones!</h1>
                    </div>
                    <div class="message">
                        <p><strong>¡Hola ${data.name}!</strong></p>
                        <p>¡Gracias por ponerte en contacto con nosotros! Estamos emocionados de ayudarte con tus necesidades de mobiliario.</p>
                        <p>Nuestro equipo se pondrá en contacto contigo pronto para discutir los detalles de tu consulta.</p>
                    </div>
                    <img class="banner" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1iJQjzt7Ko0ou5UU-oiyB02jjaSnRq-ECbg&usqp=CAU" alt="Banner de la mueblería">
                </div>
            </body>
            </html>
            `
        }
        
        const mailOptionsCommerce = {
            from :'beramassillones@gmail.com',
            to: 'beramassillones@gmail.com',
            subject: 'Nueva consulta',
            html:`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Nueva consulta</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1, h2, h3, h4, h5, h6 {
                        margin: 0 0 10px;
                        color: #333;
                    }
                    p {
                        margin: 0 0 10px;
                    }
                    .message {
                        background-color: #f9f9f9;
                        padding: 10px;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Nueva consulta</h2>
                    <div class="message">
                        <p><strong>Nombre:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Telefono:</strong> ${data.phone}</p>
                        <p><strong>Mensaje:</strong></p>
                        <p>${data.message}</p>
                    </div>
                </div>
            </body>
            </html>
            `
        }
        
        
        try {
            const mailClient = await this.transporter.sendMail(mailOptionsClients)
            console.log(mailClient);
            
            const mailCommerce = await this.transporter.sendMail(mailOptionsCommerce)
            
            if(!mailCommerce){
                return {success: false, message: 'Error sending an email'}
            } else {
                return {success: true, message: 'Send email successfully'}
            }
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
}
