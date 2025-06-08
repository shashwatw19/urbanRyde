import z from 'zod'

export const userSignInSchema = z.object({
    email : z.string().email('Invalid email address'),
    password : z.string().min(6 , 'Password must be 6 characters')
})

export const userSignUpSchema = z.object({
    email : z.string().email('invalid email address'),
    firstname : z.string().trim().min(3 , 'First name must be at least 3 characters long'),
    lastname :z.string().optional(),
    password : z.string().trim().min(6 , 'Password must be at least 6 characters long')
})


export type UserSignInSchema = z.infer<typeof userSignInSchema>;
export type UserSignUpSchema = z.infer<typeof userSignUpSchema>;