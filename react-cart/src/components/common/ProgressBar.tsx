import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './ProgressBar.module.css'

const ProgressBar = () => {
  const location = useLocation()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
    const timer = setTimeout(() => setActive(false), 600)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return <div className={`${styles.bar} ${active ? styles.active : ''}`} />
}

export default ProgressBar
