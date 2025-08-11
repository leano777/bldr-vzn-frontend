const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface HealthCheck {
  status: string;
  service: string;
  version: string;
  environment: string;
  timestamp: string;
  database?: string;
}

export interface SystemStatus {
  frontend: {
    status: 'online' | 'offline';
    version: string;
  };
  backend: {
    status: 'online' | 'offline' | 'connecting';
    message?: string;
  };
  database: {
    status: 'connected' | 'disconnected' | 'connecting';
    message?: string;
  };
}

export async function checkApiHealth(): Promise<HealthCheck | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API health check failed:', error);
    return null;
  }
}

export async function testApiConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
}

export async function getSystemStatus(): Promise<SystemStatus> {
  const health = await checkApiHealth();
  const apiConnected = await testApiConnection();

  return {
    frontend: {
      status: 'online',
      version: 'Next.js 15.4.6',
    },
    backend: {
      status: apiConnected ? 'online' : 'offline',
      message: health ? 'API Ready' : 'Connection Failed',
    },
    database: {
      status: health?.database === 'connected' ? 'connected' : 
             health?.database === 'disconnected' ? 'disconnected' : 'connecting',
      message: health?.database === 'connected' ? 'Connected' : 
               health?.database === 'disconnected' ? 'Disconnected' : 'Connecting...',
    },
  };
}
