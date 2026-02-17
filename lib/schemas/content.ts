import { z } from 'zod'

// Service schema for the 5 service offerings
export const serviceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(10),
  icon: z.string().optional(),
})

export type Service = z.infer<typeof serviceSchema>

// TechStackItem schema for the tech stack display
export const techStackItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(['frontend', 'backend', 'infrastructure', 'automation']),
})

export type TechStackItem = z.infer<typeof techStackItemSchema>

// ProcessStep schema for the 4 "How I Work" steps
export const processStepSchema = z.object({
  id: z.string().min(1),
  step: z.number().int().min(1).max(4),
  title: z.string().min(1),
  description: z.string().min(10),
  icon: z.string().optional(),
})

export type ProcessStep = z.infer<typeof processStepSchema>
