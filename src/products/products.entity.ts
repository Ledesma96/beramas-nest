import { IsArray, IsOptional, IsString} from "class-validator";

export class Product { // Transformar ObjectId a String durante la serialización
    _id

    @IsString()
    code: string;

    @IsString()
    category: string;

    @IsString()
    sub_category: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    thumbnail: string[];
}
