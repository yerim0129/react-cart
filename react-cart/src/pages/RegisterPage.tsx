import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormValues } from '@/utils/validators'
import { useRegister } from '@/hooks/useAuth'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import styles from './RegisterPage.module.css'

const RegisterPage = () => {
  const { mutate: registerUser, isPending, isError, error } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const handleRegister = ({ name, email, password }: RegisterFormValues) => {
    registerUser({ name, email, password })
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>회원가입</h1>

        {isError && (
          <ErrorMessage message={error instanceof Error ? error.message : '회원가입에 실패했습니다.'} />
        )}

        <form className={styles.form} onSubmit={handleSubmit(handleRegister)} noValidate>
          <Input
            label="이름"
            placeholder="홍길동"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="이메일"
            type="email"
            placeholder="example@email.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="8자 이상 입력해주세요"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            error={errors.passwordConfirm?.message}
            {...register('passwordConfirm')}
          />
          <Button
            label={isPending ? '가입 중...' : '회원가입'}
            type="submit"
            fullWidth
            isLoading={isPending}
          />
        </form>

        <p className={styles.footer}>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className={styles.link}>로그인</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
