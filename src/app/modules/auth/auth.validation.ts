import { z } from "zod";

export const userSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["admin", "trainer", "trainee"]).default("trainee"),
    phone: z.string().optional(),
    dateOfBirth: z.union([z.string(), z.date()]).optional(),
    specialization: z.string().optional(), // Only relevant for trainers
    membershipType: z.string().optional(), // Only relevant for trainees
    isActive: z.boolean().optional().default(true),
  }),
});

// User login validation schema
export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password is required!' }),
  }),
});
