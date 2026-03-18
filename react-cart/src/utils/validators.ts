import { z } from 'zod'

export const shippingSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
  phone: z
    .string()
    .regex(/^01[0-9]-\d{3,4}-\d{4}$/, '올바른 전화번호 형식으로 입력해주세요. (예: 010-1234-5678)'),
  address: z.string().min(5, '주소를 입력해주세요.'),
  detailAddress: z.string().min(1, '상세 주소를 입력해주세요.'),
  memo: z.string().optional(),
})

export type ShippingFormValues = z.infer<typeof shippingSchema>

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상 입력해주세요.'),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
    email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
    password: z.string().min(8, '비밀번호는 8자 이상 입력해주세요.'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
