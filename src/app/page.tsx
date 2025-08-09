export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            BLDR <span className="text-purple-400">VZN</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Building the future of construction project management with AI-powered insights and streamlined workflows.
          </p>
        </header>

        {/* Status */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-green-400 font-semibold">System Online</span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Frontend</h3>
                <p className="text-gray-300">Next.js 15.4.6</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Backend</h3>
                <p className="text-gray-300">API Ready</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-yellow-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Database</h3>
                <p className="text-gray-300">Connecting...</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">Development</h3>
              <p className="text-gray-400 mb-4">Start building your construction management platform</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                View Documentation
              </button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">API Status</h3>
              <p className="text-gray-400 mb-4">Connect to your backend services</p>
              <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors">
                Test Connection
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
