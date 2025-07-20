import { z } from 'zod';

export const createClassValidationSchema = z.object({
  body: z.object({
    className: z.string().min(1, 'Class name is required'),
    description: z.string().optional(),
    date: z.coerce
      .date()
      .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
        message: 'Invalid date',
      }),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    trainer: z
      .string()
      .regex(/^[a-f\d]{24}$/i, 'Invalid MongoDB ObjectId')
      .min(1, 'Trainer ID is required'),
    maxTrainees: z.number().optional().default(10),
    currentTrainees: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true),
  }),
});

export const classValidationSchema = {
  createClassValidationSchema,
};
