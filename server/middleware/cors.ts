export default defineEventHandler((event) => {
    // Get the request origin
    const requestOrigin = getRequestHeader(event, 'origin')
    
    // Define allowed origins - add your remote testing domain here
    const allowedOrigins = [
      'http://localhost:3000',
      'https://your-test-domain.com' // Replace with your actual testing domain
    ]
    
    // Set CORS headers if origin is allowed
    if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
      setResponseHeaders(event, {
        'Access-Control-Allow-Origin': requestOrigin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization'
      })
    }
    
    // Handle preflight requests
    if (getMethod(event) === 'OPTIONS') {
      setResponseStatus(event, 204)
      return null
    }
  })