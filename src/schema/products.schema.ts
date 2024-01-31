import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {IsArray } from 'class-validator';
import * as paginate from 'mongoose-paginate-v2';

@Schema({
    timestamps: true,
    collection: 'products'
})
export class Products extends Document {
    @Prop({
        unique: true,
        required: true,
        trim: true
    })
    code: string;

    @Prop({
        required: true,
        trim: true
    })
    category: string;

    @Prop({
        trim: true
    })
    sub_category: string;

    @Prop({
        required: true,
        trim: true
    })
    name: string;

    @Prop({
        trim: true
    })
    description: string;

    @Prop({
        type: [{ type: String }],
        trim: true,
    })
    @IsArray()
    thumbnail: []
}

const schema = SchemaFactory.createForClass(Products)
schema.plugin(paginate)
export const ProductsSchema = schema