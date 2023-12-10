import { Response, Request, NextFunction } from 'express'
import { z, AnyZodObject } from 'zod'

const baseBodySchema = {
  text: z
    .string({
      required_error: 'Text is required',
    })
    .min(1)
    .max(50),
  completed: z.boolean().optional(),
}

export const postSchema = z.object({
  body: z.object(baseBodySchema).strict(),
})

export const patchSchema = z.object({
  body: z
    .object({
      ...baseBodySchema,
      text: baseBodySchema.text.optional(),
    })
    .strict(),
})

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
      })
      return next()
    } catch (error) {
      const err = error as z.ZodError
      const reason = err.issues
        .map(
          (issue: z.ZodIssue) => `Path: ${issue.path}, Issue: ${issue.message}`
        )
        .join(';')

      res.status(400).json(reason)
      return
    }
  }
