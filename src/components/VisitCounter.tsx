import React, { useState, useEffect } from 'react';
import { Eye, Users, Calendar, TrendingUp, Wifi, WifiOff } from 'lucide-react';
import { useOnlineUsers } from '../hooks/useOnlineUsers';

interface VisitStats {
  totalVisits: number;
  todayVisits: number;
  servedPatients: number;
}

export const VisitCounter: React.FC = () => {
  const [stats, setStats] = useState<VisitStats>({
    totalVisits: 0,
    todayVisits: 0,
    servedPatients: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // 使用实时在线用户Hook
  const { onlineUsers, isConnected } = useOnlineUsers();

  // Supabase 配置
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const incrementVisitCount = async () => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.log('Supabase 未配置，使用模拟数据');
      useLocalFallback();
      return;
    }

    try {
      // 检查今天是否已经访问过
      const today = new Date().toDateString();
      const hasVisitedToday = localStorage.getItem('xiaohongka_visited_today') === today;
      
      if (!hasVisitedToday) {
        // 调用 Supabase Edge Function 增加访问计数
        const response = await fetch(`${SUPABASE_URL}/functions/v1/increment-visit`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: today,
            userAgent: navigator.userAgent.substring(0, 100)
          })
        });

        if (response.ok) {
          const data = await response.json();
          setStats({
            totalVisits: data.totalVisits,
            todayVisits: data.todayVisits,
            servedPatients: data.servedPatients
          });
          localStorage.setItem('xiaohongka_visited_today', today);
        }
      } else {
        // 如果今天已访问，只获取最新统计数据
        await fetchLatestStats();
      }
    } catch (error) {
      console.error('访问计数失败:', error);
      useLocalFallback();
    }
  };

  const fetchLatestStats = async () => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      useLocalFallback();
      return;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/get-visit-stats`, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats({
          totalVisits: data.totalVisits,
          todayVisits: data.todayVisits,
          servedPatients: data.servedPatients
        });
      } else {
        useLocalFallback();
      }
    } catch (error) {
      console.error('获取统计数据失败:', error);
      useLocalFallback();
    }
  };

  const useLocalFallback = () => {
    // 降级方案：使用本地存储模拟全局数据
    const baseVisits = 0;
    const localIncrement = parseInt(localStorage.getItem('xiaohongka_local_increment') || '0');
    
    const today = new Date().toDateString();
    if (localStorage.getItem('xiaohongka_visited_today') !== today) {
      const newIncrement = localIncrement + Math.floor(Math.random() * 3) + 1;
      localStorage.setItem('xiaohongka_local_increment', newIncrement.toString());
      localStorage.setItem('xiaohongka_visited_today', today);
    }
    
    const totalVisits = baseVisits + parseInt(localStorage.getItem('xiaohongka_local_increment') || '0');
    const todayVisits = Math.floor(Math.random() * 5) + 1;
    
    setStats({
      totalVisits,
      todayVisits,
      servedPatients: Math.floor(totalVisits * 0.75)
    });
  };

  useEffect(() => {
    const initializeCounter = async () => {
      setIsLoading(true);
      await incrementVisitCount();
      setIsLoading(false);
    };

    initializeCounter();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-red-50 via-white to-pink-50 border border-red-100 rounded-xl p-6 mb-6 shadow-sm">
        <div className="text-center">
          <div className="animate-pulse text-gray-400">正在加载统计数据...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-50 via-white to-pink-50 border border-red-100 rounded-xl p-6 mb-6 shadow-sm">
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-gray-600 mb-1">小红卡服务统计</h3>
        <div className="w-16 h-0.5 bg-red-300 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-white rounded-lg border border-red-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center mb-2">
            <Eye className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-xl font-bold text-red-600">{formatNumber(stats.totalVisits)}</div>
          <div className="text-xs text-gray-500">累计访问</div>
        </div>
        
        <div className="text-center p-3 bg-white rounded-lg border border-red-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-blue-600">{stats.todayVisits}</div>
          <div className="text-xs text-gray-500">今日访问</div>
        </div>
        
        <div className="text-center p-3 bg-white rounded-lg border border-red-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-xl font-bold text-green-600">{formatNumber(stats.servedPatients)}</div>
          <div className="text-xs text-gray-500">已服务患者</div>
        </div>
        
        <div className="text-center p-3 bg-white rounded-lg border border-red-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center mb-2">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-purple-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div className="text-xl font-bold text-purple-600">{onlineUsers}</div>
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            在线用户
            {isConnected && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🏥 专业医疗指引 • 🔒 数据本地处理 • 💝 免费公益服务
        </p>
        <div className="flex items-center justify-center gap-2 mt-1">
          {isConnected ? (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              实时在线统计
            </p>
          ) : (
            <p className="text-xs text-orange-500 flex items-center gap-1">
              <WifiOff className="w-3 h-3" />
              离线模式
            </p>
          )}
        </div>
      </div>
    </div>
  );
};