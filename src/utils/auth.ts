// Utility functions for authentication
export const clearStoredToken = () => {
  localStorage.removeItem('access_token')
}

export const isValidToken = (token: string): boolean => {
  if (!token) return false
  
  const tokenParts = token.split('.')
  if (tokenParts.length !== 3) return false
  
  try {
    const payload = JSON.parse(atob(tokenParts[1]))
    const currentTime = Date.now() / 1000
    return !(payload.exp && payload.exp < currentTime)
  } catch (error) {
    return false
  }
}

export const getStoredToken = (): string | null => {
  const token = localStorage.getItem('access_token')
  if (token && isValidToken(token)) {
    return token
  }
  // Token không hợp lệ, xóa nó
  clearStoredToken()
  return null
} 