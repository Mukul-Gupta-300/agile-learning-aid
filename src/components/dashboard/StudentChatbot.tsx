import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot, ExternalLink, RefreshCw } from 'lucide-react';

const StudentChatbot = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef(null);

  // Check if 3D teacher is running
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://localhost:5173', { mode: 'no-cors' });
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
      setIframeLoaded(false);
    }
  };

  const openInNewTab = () => {
    window.open('http://localhost:5173', '_blank');
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0071c5] via-[#004494] to-[#002c5f] rounded-2xl p-4 text-white mb-4 mx-4 mt-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <MessageCircle className="h-6 w-6 md:h-8 md:w-8 mr-3" />
          3D AI Teacher Assistant
        </h1>
        <p className="text-[#a8d4f0] text-sm md:text-base">Interactive learning with your virtual 3D teacher</p>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex gap-4 mx-4 mb-4 overflow-hidden">
        {/* Control Sidebar - Smaller width */}
        <div className="w-64 flex-shrink-0 space-y-3">
          <Card className="h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={refreshIframe}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={openInNewTab}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                New Tab
              </Button>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div 
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-xs">
                  {isConnected ? 'Online' : 'Offline'}
                </span>
              </div>
              {!isConnected && (
                <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-xs">
                  Start 3D teacher on :5173
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area - 3D Teacher Iframe - Takes remaining space */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Card className="flex-1 flex flex-col overflow-hidden h-full">
            <CardHeader className="pb-3 flex-shrink-0">
              <CardTitle className="flex items-center justify-between text-base md:text-lg">
                <div className="flex items-center">
                  <Bot className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#0071c5]" />
                  Your 3D Virtual Teacher
                </div>
                <div className="flex items-center space-x-2">
                  {iframeLoaded && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Loaded</span>
                    </div>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 overflow-hidden">
              <div className="w-full h-full rounded-lg overflow-hidden border">
                {isConnected ? (
                  <iframe
                    ref={iframeRef}
                    src="http://localhost:5173"
                    className="w-full h-full border-0"
                    title="3D Virtual Teacher"
                    onLoad={() => setIframeLoaded(true)}
                    onError={() => setIframeLoaded(false)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                    <div className="text-center p-4">
                      <Bot className="h-12 w-12 md:h-16 md:w-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-base md:text-lg font-semibold text-slate-600 dark:text-slate-400">
                        3D Teacher Not Available
                      </h3>
                      <p className="text-sm text-slate-500 mt-2">
                        Please start your 3D teacher on port 5173
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4 text-xs md:text-sm"
                        onClick={() => window.location.reload()}
                      >
                        <RefreshCw className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                        Retry Connection
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentChatbot;