import io from 'socket.io-client';
import { useState, useEffect } from 'react';

export default function useConnectToSockNamespace(namespace) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const sock = io(`${process.env.SOCK_HOST}${namespace}`, {
      path: process.env.SOCK_PATH,
    });
    setSocket(sock);

    return () => {
      sock.close();
    };
  }, [namespace]);

  return socket;
}
