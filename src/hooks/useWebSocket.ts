import { useEffect, useRef } from 'react';

export const useWebSocket = (
  symbol: string,
  interval: string,
  handleData: (data: any) => void
) => {
  const socketRef = useRef<WebSocket | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing debounce timers
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Use a debounce to avoid opening/closing WebSocket too rapidly
    debounceTimer.current = setTimeout(() => {
      const url = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;
      console.log(`Connecting to WebSocket for ${symbol} @ ${interval} interval`);

      // Ensure previous WebSocket is closed before opening a new one
      if (socketRef.current) {
        console.log('Closing existing WebSocket connection');
        socketRef.current.close(); // Closing previous WebSocket
      }

      // Create a new WebSocket connection
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connection established');
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        handleData(message); // Process incoming data
      };

      socket.onclose = (event) => {
        console.warn('WebSocket connection closed:', event);
        if (!event.wasClean || event.code === 1006) {
          console.error('WebSocket closed with an error. Code:', event.code, 'Reason:', event.reason);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    }, 300); // Delay by 300ms before opening a new WebSocket

    // Cleanup WebSocket connection when symbol/interval changes or component unmounts
    return () => {
      if (socketRef.current) {
        console.log('Cleaning up and closing WebSocket connection');
        socketRef.current.close();
        socketRef.current = null; // Ensure reference is cleared
      }
    };
  }, [symbol, interval, handleData]);

  return socketRef.current;
};
