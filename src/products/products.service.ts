import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { ProductsDto, UpdateProductsDto } from 'src/dto/products.dto';
import { Products } from 'src/schema/products.schema';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Products.name) private productModel: PaginateModel<Products>){}

    async getAllProducts(
        limit: number,
        page: number,
        category: string,
        sub_category:string,) : Promise<{success: boolean, message: string, products?:any}>{
            try {
                const filterCategory = category ? { category } : {};
                const filterSubCategory = sub_category  == "null" || sub_category == null || sub_category == undefined? {} : {sub_category };
                
                const filters = {
                    ...filterCategory,
                    ...filterSubCategory,
                };
                const products = await this.productModel.paginate(filters, {
                    page,
                    limit,
                    lean: true,
                })
                
                
            if(!products){
                return {success: false, message:'Products not found'}
            } else {
                return {success: true, message: 'Products obtain succesfully', products}
            }
        } catch (error) {
            return {success: false, message: error.message}
        }
        
    }

    async getProductById(id: string) : Promise<{success: boolean, message: string, product?: Product}>{
        const product = await this.productModel.findById(id)
        try {
            if(!product){
                return {success: false, message: 'Product not found'}
            } else {
                return {success: true, message: 'Products found successfully', product}
            }

        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async createProduct(data: ProductsDto, files: Express.Multer.File[]): Promise<{success: boolean, message: string, product?: Product}> {
        try {
            data.thumbnail = files.map(file => `/upload/products/${file.filename}`)
            const newProduct = await this.productModel.create(data);
            return { success: true, message: 'Product created successfully', product: newProduct };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async updateProduct(data: UpdateProductsDto, id: string, files: Express.Multer.File[]): Promise<{success: boolean, message: string}>{
        try {
            data.thumbnail = files.map(file => `/upload/products/${file.filename}`)
            const result = await this.productModel.findByIdAndUpdate(id, data);
            if(result){
                return { success: true, message:'Product updated successfully'}
            } else {
                return {success: false, message: 'It was not possible to update the product'}
            }
        } catch (error) {
            throw error.message
        }
    }
    

    async deleteProduct(id: string): Promise<{ success: boolean; message?: string }> {
        try {
            const deletedProduct = await this.productModel.findByIdAndDelete(id);
    
            if (deletedProduct) {
                return { success: true, message: 'Product deleted successfully.' };
            } else {
                return { success: false, message: 'Product not found.' };
            }
        } catch (error) {
            return { success: false, message: 'Error deleting the product.' };
        }
    }
    
}
