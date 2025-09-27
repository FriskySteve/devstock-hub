import { z } from "zod";

export const createAccountSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().min(10, "Please enter your phone number."),
    password: z
      .string()
      .min(
        8,
        "Create a password which has at least 8 characters and includes at least 1 upper case letter, 1 lower case letter and 1 number."
      )
      .regex(
        /[A-Z]/,
        "Create a password which has at least 8 characters and includes at least 1 upper case letter, 1 lower case letter and 1 number."
      )
      .regex(
        /[a-z]/,
        "Create a password which has at least 8 characters and includes at least 1 upper case letter, 1 lower case letter and 1 number."
      )
      .regex(
        /\d/,
        "Create a password which has at least 8 characters and includes at least 1 upper case letter, 1 lower case letter and 1 number."
      ),
    confirmPassword: z.string().min(1, "Please enter confirm password"),
    country: z.string().min(1, "Please select a country."),
    accept: z.literal(true, {
      message: "You must agree to the terms.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
