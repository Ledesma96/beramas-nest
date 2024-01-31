import { IsNumber, IsString } from "class-validator"

export class Email{
    @IsString()
    name: string

    @IsString()
    email: string

    @IsNumber()
    phone: number

    @IsString()
    message: string
}