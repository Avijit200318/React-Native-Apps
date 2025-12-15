import {z} from "zod";
import { toFormikValidationSchema } from 'zod-formik-adapter';

export const signInValidation = toFormikValidationSchema(z.object({
    email: z.email({message: "Invalide email"}),
    password: z.string().min(6, {message: "Password must be 6 charecters long"})
}));