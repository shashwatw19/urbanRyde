import z from 'zod'

export const captainSignUpSchema = z.object({
    firstname : z.string().trim().min(3 , 'First name must be at least 3 characters long'),
    lastname : z.string().optional(),
    email : z.string().trim().email('Please enter a valid email address'),
    password : z.string().trim().min(6 , 'Password must be atleast 6 characters long'),
    color : z.string().trim().min(3 , 'Colour must be 3 character long'),
    NumberPlate : z.string().trim().min(10 , 'Enter a valid plate number'),
    capacity : z.number().min(1 , 'Vehicle should have minimum capacity of 1'),
    vehicleType : z.enum(["car", "auto", "moto"], {
        required_error: "Vehicle type is required",
        invalid_type_error: "Vehicle type must be one of: car, auto, bike"
    })
})

export const captainSignInSchema = z.object({
    email : z.string().email('enter a valid email address'),
    password : z.string().min(6 , 'password length must be atleast 6 characters')
})

export type CaptainSignUpSchema = z.infer<typeof captainSignUpSchema>
export type CaptainSignInSchema = z.infer<typeof captainSignInSchema>