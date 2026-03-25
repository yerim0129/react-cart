import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Toast from '@/components/common/Toast'
import ProgressBar from '@/components/common/ProgressBar'
import LoginRequiredModal from '@/components/common/LoginRequiredModal'
import styles from './Layout.module.css'

const Layout = () => {
  return (
    <div className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>본문 바로가기</a>
      <Header />
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <Toast />
      <ProgressBar />
      <LoginRequiredModal />
    </div>
  )
}

export default Layout
