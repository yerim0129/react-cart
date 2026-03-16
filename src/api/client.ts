import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 (추후 토큰 추가 용이)
apiClient.interceptors.request.use((config) => {
  return config
})

// 응답 인터셉터 (전역 에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error.response?.data ?? error.message)
    return Promise.reject(error)
  }
)

export default apiClient
