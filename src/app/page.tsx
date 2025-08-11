'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSystemStatus, type SystemStatus } from '../lib/api';

export default function Home() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      setIsLoading(true);
      try {
        const status = await getSystemStatus();
        setSystemStatus(status);
      } catch (error) {
        console.error('Failed to get system status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
    
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'connected':
        return 'bg-green-500';
      case 'connecting':
        return 'bg-yellow-500';
      case 'offline':
      case 'disconnected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressWidth = (status: string) => {
    switch (status) {
      case 'online':
      case 'connected':
        return 'w-full';
      case 'connecting':
        return 'w-3/4';
      case 'offline':
      case 'disconnected':
        return 'w-1/4';
      default:
        return 'w-1/2';
    }
  };

  const overallSystemStatus = systemStatus
    ? systemStatus.backend.status === 'online' && systemStatus.database.status === 'connected'
      ? 'online'
      : 'partial'
    : 'offline';

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      const status = await getSystemStatus();
      setSystemStatus(status);
      
      // Show a brief success/failure message
      const message = status.backend.status === 'online' 
        ? 'Connection successful!' 
        : 'Connection failed!';
      
      // You could add a toast notification here
      console.log(message, status);
    } catch (error) {
      console.error('Connection test failed:', error);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            BLDR <span className="text-purple-400">VZN</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transforming how you manage and execute your vision with AI-powered insights and streamlined workflows.
          </p>
        </header>

        {/* Status */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-3 h-3 rounded-full mr-3 ${
                isLoading
                  ? 'bg-gray-500 animate-pulse'
                  : overallSystemStatus === 'online'
                  ? 'bg-green-500 animate-pulse'
                  : overallSystemStatus === 'partial'
                  ? 'bg-yellow-500 animate-pulse'
                  : 'bg-red-500'
              }`}></div>
              <span className={`font-semibold ${
                isLoading
                  ? 'text-gray-400'
                  : overallSystemStatus === 'online'
                  ? 'text-green-400'
                  : overallSystemStatus === 'partial'
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}>
                {isLoading
                  ? 'Checking System Status...'
                  : overallSystemStatus === 'online'
                  ? 'System Online'
                  : overallSystemStatus === 'partial'
                  ? 'System Partially Online'
                  : 'System Offline'
                }
              </span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Frontend</h3>
                <p className="text-gray-300">
                  {isLoading ? 'Loading...' : systemStatus?.frontend.version || 'Next.js 15.4.6'}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className={`h-2 rounded-full ${
                    isLoading ? 'bg-gray-500 w-1/2' : `${getStatusColor(systemStatus?.frontend.status || 'online')} ${getProgressWidth(systemStatus?.frontend.status || 'online')}`
                  }`}></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Backend</h3>
                <p className="text-gray-300">
                  {isLoading ? 'Checking...' : systemStatus?.backend.message || 'Checking...'}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className={`h-2 rounded-full ${
                    isLoading ? 'bg-gray-500 w-1/2' : `${getStatusColor(systemStatus?.backend.status || 'offline')} ${getProgressWidth(systemStatus?.backend.status || 'offline')}`
                  }`}></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Database</h3>
                <p className="text-gray-300">
                  {isLoading ? 'Checking...' : systemStatus?.database.message || 'Checking...'}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className={`h-2 rounded-full ${
                    isLoading ? 'bg-gray-500 w-1/2' : `${getStatusColor(systemStatus?.database.status || 'connecting')} ${getProgressWidth(systemStatus?.database.status || 'connecting')}`
                  }`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">Get Started</h3>
              <p className="text-gray-400 mb-4">Create an account or sign in to access your dashboard</p>
              <div className="space-y-2">
                <Link href="/register" className="block">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Create Account
                  </button>
                </Link>
                <Link href="/login" className="block">
                  <button className="w-full bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">Development</h3>
              <p className="text-gray-400 mb-4">Start building your vision management platform</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                View Documentation
              </button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">API Status</h3>
              <p className="text-gray-400 mb-4">Connect to your backend services</p>
              <button 
                onClick={handleTestConnection}
                disabled={isTesting}
                className={`px-6 py-2 rounded-lg transition-colors text-white ${
                  isTesting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isTesting ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16">
          <p className="text-gray-500">
            Deployed on Vercel • Built with Next.js • Powered by Innovation
          </p>
        </footer>
      </div>
    </div>
  );
}
