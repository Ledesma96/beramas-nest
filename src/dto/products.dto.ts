import { Prop } from "@nestjs/mongoose"
import { IsArray, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class ProductsDto {
    @IsString()
    @Prop({
        unique: true,
    })
    code: string;

    @IsString()
    category: string;

    @IsString()
    sub_category: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    descriptions?: string;

    @IsArray()
    @IsOptional()
    @IsString({
        each: true,
    })
    thumbnail: string[];
}


export class UpdateProductsDto{
    @IsOptional()
    name?: string

    @IsOptional()
    descriptions?: string

    @IsOptional()
    @IsArray()
    @MinLength(1, { message: 'Debe haber al menos un elemento en la matriz' })
    @MaxLength(5, { message: 'No se permiten más de 5 elementos en la matriz' })
    thumbnail: any[];

}