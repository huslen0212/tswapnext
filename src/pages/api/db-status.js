import { testDbConnection } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test database connection
    const connectionResult = await testDbConnection();
    
    if (connectionResult.success) {
      res.status(200).json({ status: 'OK', message: 'Database connection successful' });
    } else {
      res.status(500).json({ 
        status: 'ERROR', 
        message: 'Database connection failed',
        error: connectionResult.error
      });
    }
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Server error during health check',
      error: error.message
    });
  }
} 