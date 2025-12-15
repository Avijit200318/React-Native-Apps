import {z} from "zod";
import { toFormikValidationSchema } from 'zod-formik-adapter';

export const signUpValidation = toFormikValidationSchema(z.object({
    name: z.string().min(6, {message: "Name must be atleast 6 charecters"}),
    email: z.email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be atleast 6 charecters long"})
}))

