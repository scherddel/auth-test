import type { H3Event } from 'h3';
import { defineEventHandler, readBody, setCookie } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Get request body
    const { username, password } = await readBody(event)

    
    // Your authentication logic here
    // This is where you would validate credentials against your database
    // For example:
    // const user = await db.users.findOne({ username, password: hashPassword(password) })
    
    if (!username || !password) {
      throw new Error('Missing credentials')
    }
    
    // For demo purposes - replace with your actual auth logic
    const isValid = username === 'demo' && password === 'password'
    
    if (!isValid) {
      throw new Error('Invalid credentials')
    }
    
    // Generate a token - in production use a proper JWT or other token mechanism
    const token = `token_${Date.now()}`
    
    // Set the authentication cookie with proper CORS settings
    setCookie(event, 'auth-token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    
    // Return success response
    return { 
      success: true,
      user: {
        id: 1,
        username: username,
      }
    }
  } catch (error) {
    setResponseStatus(event, 401)
    
    return {
      success: false,
      error
    }
  }
})