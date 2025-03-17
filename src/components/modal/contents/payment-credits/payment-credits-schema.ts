import { z } from 'zod'

export const paymentCreditsSchema = z.object({
  sum: z.string().min(1, { message: 'Введите данные' }).regex(/^\d+$/, { message: 'Можно вводить только цифры' })
})

export type PaymentCreditsFormValues = z.infer<typeof paymentCreditsSchema>
