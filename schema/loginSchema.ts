import z from "zod";

export const loginSchema = z.object({
  emailOrMobile: z
    .string()
    .min(1, "Please enter your email or mobile.")
    .refine((val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{9}$/;
      return emailRegex.test(val) || phoneRegex.test(val);
    }, "Email or Phone Number is not valid."),
  password: z.string().min(1, "Please enter your password."),
});
