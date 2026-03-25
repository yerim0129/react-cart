import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormValues } from '@/utils/validators'
import { useLogin } from '@/hooks/useAuth'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import styles from './LoginPage.module.css'

const LoginPage = () => {
  const { mutate: login, isPending, isError, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const handleLogin = (data: LoginFormValues) => {
    login(data)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>로그인</h1>

        {isError && (
          <ErrorMessage message={error instanceof Error ? error.message : '로그인에 실패했습니다.'} />
        )}

        <form className={styles.form} onSubmit={handleSubmit(handleLogin)} noValidate>
          <Input
            label="이메일"
            type="email"
            placeholder="test@test.com"
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
          <Button
            label={isPending ? '로그인 중...' : '로그인'}
            type="submit"
            fullWidth
            isLoading={isPending}
          />
        </form>

        <p className={styles.footer}>
          아직 계정이 없으신가요?{' '}
          <Link to="/register" className={styles.link}>회원가입</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
