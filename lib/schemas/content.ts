import { z } from 'zod'

// Service schema for the 5 service offerings
export const serviceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(10),
  icon: z.string().optional(),
})

export type Service = z.infer<typeof serviceSchema>

// Differentiator schema for the "What Makes This Different" section
export const differentiatorSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(10),
})

export type Differentiator = z.infer<typeof differentiatorSchema>

// ProcessStep schema for the 4 "How I Work" steps
export const processStepSchema = z.object({
  id: z.string().min(1),
  step: z.number().int().min(1).max(5),
  title: z.string().min(1),
  description: z.string().min(10),
  icon: z.string().optional(),
})

export type ProcessStep = z.infer<typeof processStepSchema>
