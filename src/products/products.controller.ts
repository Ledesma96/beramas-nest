import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    Delete,
    NotFoundException, 
    InternalServerErrorException,
    UseInterceptors,
    UploadedFiles,
    Query,
    Patch,
    ForbiddenException} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ProductsDto, UpdateProductsDto } from 'src/dto/products.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/v1/products')
export class ProductsController {
    constructor(private productsServices: ProductsService){}

    @Get()
    async getAllProducts(
        @Query('page') page:number, 
        @Query('limit') limit: number,
        @Query('category') category: string,
        @Query('sub_category') sub_category: string ): Promise<{success: boolean, message: string, products?: any}>{
        try {
            const result = await  this.productsServices.getAllProducts(limit, page, category, sub_category)

            if(result.success){
                return result
            } else {
                throw new NotFoundException(result.message)
            }
            
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Get('filter/:id')
    async getProductById(@Param('id') id: string): Promise<{success: boolean, message: string, products?: Product}>{
        try {
            const result = await this.productsServices.getProductById(id)
            if(result.success){
                return result
            }else {
                throw new NotFoundException(result.message)
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }


    @UseInterceptors(
        FilesInterceptor(
            'file', undefined,
            {
                storage: diskStorage({
                    destination: './upload/products',
                    filename: function(req, file, cb){
                        cb(null, file.originalname + Date.now() + '.jpg')
                    }
                })
            }
        )
    )
    @Post()
    async createProducts(@UploadedFiles() files : Express.Multer.File[] ,@Body() product: ProductsDto): Promise<{success: boolean, message: string, products?: Product}>{
        try {
            
            const result = await this.productsServices.createProduct(product, files)
            return result
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Patch(':id')
    async updateProducts(
        @Body() data: UpdateProductsDto,
        @Param('id') id: string
        ): Promise<{success: boolean, message: string}>{
        try {
            const result = await this.productsServices.updateProduct(data, id)
            if(result.success){
                return result
            } else {
                throw new ForbiddenException(result.message)
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<{ success: boolean; message?: string }> {
        try {
            const result = await this.productsServices.deleteProduct(id);

            if (result.success) {
                return result;
            } else {
                throw new NotFoundException(result.message);
            }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error deleting the product.');
        }
    }
}
