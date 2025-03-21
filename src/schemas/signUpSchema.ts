import {z} from 'zod'

export const usernameValidation = z
        .string()
        .min(2, "UserName must be atleast 2 characters")
        .max(20,"Username must be not more than 20 charcaters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");


export const signUpSchema = z.object({
        username: usernameValidation,
        email: z.string().email({message: "Invalid email adress"}),
        password: z.string().min(6,{message: "password must be atleast 6 charcaters"})
})        