import { useState, useEffect, useRef } from 'react';

interface OnlineUsersHook {
  onlineUsers: number;
  isConnected: boolean;
}

export const useOnlineUsers = (): OnlineUsersHook => {
  const [onlineUsers, setOnlineUsers] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const sessionIdRef = useRef<string>();
  const heartbeatIntervalRef = useRef<NodeJS.Timeout>();

  // 生成唯一会话ID
  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // 发送心跳
  const sendHeartbeat = async () => {
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      // 降级方案：模拟在线用户数
      setOnlineUsers(Math.floor(Math.random() * 5) + 1);
      setIsConnected(false);
      return;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/update-online-status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          userAgent: navigator.userAgent.substring(0, 100)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setOnlineUsers(data.onlineUsers || 1);
        setIsConnected(true);
      } else {
        throw new Error('Network error');
      }
    } catch (error) {
      console.warn('在线用户统计失败，使用降级方案:', error);
      // 降级方案：模拟在线用户数
      setOnlineUsers(prev => {
        const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
        const newCount = Math.max(1, Math.min(8, prev + variation));
        return newCount;
      });
      setIsConnected(false);
    }
  };

  useEffect(() => {
    // 初始化会话ID
    sessionIdRef.current = generateSessionId();

    // 立即发送第一次心跳
    sendHeartbeat();

    // 设置定期心跳（每30秒）
    heartbeatIntervalRef.current = setInterval(sendHeartbeat, 30000);

    // 页面可见性变化时的处理
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // 页面变为可见时立即发送心跳
        sendHeartbeat();
      }
    };

    // 页面卸载时的清理
    const handleBeforeUnload = () => {
      // 这里可以发送离线信号，但由于浏览器限制，通常不可靠
      // 依赖服务端的超时清理机制更可靠
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // 清理定时器
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }

      // 移除事件监听器
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return {
    onlineUsers,
    isConnected
  };
};