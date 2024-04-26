// src/validations/adminSchema.ts
import {z} from 'zod';

export const productSchema = z.object({
    name: z.string().min(1, {message: 'El nombre del plato es requerido'}).min(3, {message: 'El nombre del plato debe tener al menos 3 caracteres'}).max(255, {message: 'El nombre del plato debe tener menos de 255 caracteres'}),
    category: z.string().min(1, {message: 'La categoría es requerida'}),
    description: z.string().min(1, {message: 'La descripción es requerida'}).max(255, {message: 'La descripción debe tener menos de 255 caracteres'}),
    cantidad: z.string().min(1, {message: 'La cantidad es requerida'}),
    precio: z.string().min(1, {message: 'El precio es requerido'}),
    image: z.any(),
});