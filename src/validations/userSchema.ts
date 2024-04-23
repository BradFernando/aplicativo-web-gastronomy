import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(1, {message: 'El nombre es requerido'}).min(3, {message: 'El nombre debe tener al menos 3 caracteres'}).max(255, {message: 'El nombre debe tener menos de 255 caracteres'}),
    email: z.string().min(1, {message: 'El email es requerido'}).email({message: 'El email no es válido'}),
    cedula: z.string().min(1, {message: 'La cédula es requerida'}).length(10, {message: 'La cédula debe tener 10 caracteres'}),
    terms: z.boolean().refine(value => value, {message: 'Debes aceptar los términos y condiciones'}),
});