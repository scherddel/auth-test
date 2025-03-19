// Create a reactive state for the user
const user = ref(null)
const isAuthenticated = ref(false)
const isLoading = ref(false)
const error = ref(null)

export const useAuth = () => {
  const router = useRouter()
  
  // Login function
  const login = async (username: string, password: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { username, password },
        credentials: 'include', // Important for cookies
      })
      
      if (response.success) {
        user.value = response.user
        isAuthenticated.value = true
        
        // Optional: redirect after login
        router.push('/dashboard')
      } else {
        throw new Error('Login failed')
      }
    } catch (err) {
      error.value = err.message || 'Something went wrong'
      console.error('Login error:', err)
    } finally {
      isLoading.value = false
    }
  }
  
  // Logout function
  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Clear state even if the API call fails
      user.value = null
      isAuthenticated.value = false
      router.push('/login')
    }
  }
  
  // Check authentication status
  const checkAuth = async () => {
    isLoading.value = true
    
    try {
      const response = await $fetch('/api/auth/me', {
        credentials: 'include'
      })
      
      if (response.user) {
        user.value = response.user
        isAuthenticated.value = true
      }
    } catch (err) {
      user.value = null
      isAuthenticated.value = false
    } finally {
      isLoading.value = false
    }
  }
  
  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    error: readonly(error),
    login,
    logout,
    checkAuth
  }
}